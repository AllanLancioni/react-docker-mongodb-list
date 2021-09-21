import { Customer } from "./customers.model";

export default class CustomerService {
  static async list(queryParams: any) {
    console.log('list')
    try {
      const resp = await Customer
        .aggregate([
          {
            $lookup: {
              from: 'orders',
              let: { customerId: '$customer' },
              pipeline: [
                {
                  $lookup: {
                    from: 'bonds',
                    foreignField: '_id',
                    localField: 'bond',
                    as: 'bond'
                  }
                },
                {
                  $unwind: '$bond'
                }
              ],
              as: 'orders'
            }
          }
        ])
      console.log(resp)
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
