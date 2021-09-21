import { Order } from "./orders.model";

export default class OrdersService {
  static async list(queryParams: any) {
    try {
      const resp = await Order.find({})
        .populate(['customer', 'bond'])
        .sort({ name: 1 });
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
