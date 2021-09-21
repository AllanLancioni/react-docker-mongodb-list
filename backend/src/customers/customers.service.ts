import { Customer } from "./customers.model";

export default class CustomerService {
  static async list(queryParams: any) {
    try {
      const data = await Customer.aggregate([
        ...(
          queryParams.search 
            ? [{ $match: { name: new RegExp(queryParams.search, 'i') } }] 
            : []
        ),
        {
          $lookup: {
            from: 'orders',
            let: { customerId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$customer', '$$customerId'] },
                      ...(queryParams.defaulting ? [{ $eq: ['$paidAt', null] }] : [])
                    ]
                  }
                }
              },
              {
                $sort: { boughtAt: 1 }
              },
              {
                $lookup: {
                  from: 'bonds',
                  foreignField: '_id',
                  localField: 'bond',
                  as: 'bond'
                }
              },
              { $unwind: '$bond' }
            ],
            as: 'orders'
          },
        },
        {
          $unwind: {
            path: '$orders',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            email: { $first: '$email' },
            document: { $first: '$document' },
            orders: { $push: '$orders' }
          }
        },
        {
          $sort: {
            name: 1
          }
        }
      ]);

      data.forEach(customer => {
        const orderFound = customer.orders.find(order => !order.paidAt);
        customer.isDefaulting = !!orderFound;
        customer.since = orderFound ? orderFound.boughtAt : null;
        customer.debt = customer.orders.reduce((ac, x) => ac + x.bond.price, 0)
        delete customer.orders

      });

      return { data, count: data.length };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
