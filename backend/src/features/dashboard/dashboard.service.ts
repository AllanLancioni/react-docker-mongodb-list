import { Customer } from "../customers/customers.model";
import { Order } from "../orders/orders.model";
import { Bond } from "../bonds/bonds.model";
import { customersWithOrdersPipeline } from "../../shared/queries/customersWithPipeline";

export default class DashboardService {
  static async brief() {
    try {
      const [bonds, orders, customers, defaultingCustomers] = await Promise.all([
        Bond.countDocuments({}),
        Order.countDocuments({}),
        Customer.countDocuments({}),
        Customer.aggregate(customersWithOrdersPipeline(''))
          .then(data => data.filter(x => x.orders.some(order => !order.paidAt)))
          .then(data => data.length),
      ]);

      return {
        bonds,
        orders,
        customers,
        defaultingCustomers
      }
    } catch (error) {
      throw error;
    }
  }
}
