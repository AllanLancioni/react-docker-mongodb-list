import { Customer } from "../customers/customers.model";
import { Order } from "../orders/orders.model";
import { Bond } from "../bonds/bonds.model";

export default class DashboardService {
  static async brief() {
    try {
      const [bonds, orders, pendingOrders, customers ] = await Promise.all([
        Bond.countDocuments({}),
        Order.countDocuments({}),
        Order.countDocuments({ paidAt: null }),
        Customer.countDocuments({ }),
      ]);

      return {
        bonds,
        orders,
        pendingOrders,
        customers
      }
    } catch (error) {
      throw error;
    }
  }
}
