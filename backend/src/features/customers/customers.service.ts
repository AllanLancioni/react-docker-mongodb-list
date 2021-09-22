import { customersWithOrdersPipeline } from "../../shared/queries/customersWithPipeline";
import { Customer } from "./customers.model";

export default class CustomerService {
  static async list(queryParams: any) {
    try {
      const pipeline = customersWithOrdersPipeline(queryParams.search);

      let data = await Customer.aggregate(pipeline);

      data = data.filter(customer => {
          const orderFound = customer.orders.find(order => !order.paidAt);
          customer.since = orderFound ? orderFound.boughtAt : null;
          customer.total = customer.orders.reduce((ac, x) => ac + x.bond.price, 0)
          customer.debt = customer.orders.reduce((ac, x) => ac + (x.paidAt ? 0 : x.bond.price), 0)
          customer.isDefaulting = customer.debt > 0;
          customer.orders = customer.orders.length;

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
      throw error;
    }
  }
}
