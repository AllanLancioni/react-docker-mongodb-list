import { customersWithOrdersPipeline } from "../../shared/queries/customersWithPipeline";
import { Customer } from "./customers.model";

export default class CustomerService {
  static async list(queryParams: any) {
    try {
      const pipeline = customersWithOrdersPipeline(queryParams.search);

      let data = await Customer.aggregate(pipeline);

      data = data.filter(customer => {
          const orderFound = customer.orders.find(order => !order.paidAt);
          customer.isDefaulting = !!orderFound;
          customer.since = orderFound ? orderFound.boughtAt : null;
          customer.debt = customer.orders.reduce((ac, x) => ac + x.bond.price, 0)
          delete customer.orders

          switch (queryParams.type) {
            case 'DEFAULTING':
              return customer.isDefaulting;
            case 'NOT_DEFAULTING':
              return !customer.isDefaulting;
            default:
              return true;
          }
        });

      return { data, count: data.length };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
