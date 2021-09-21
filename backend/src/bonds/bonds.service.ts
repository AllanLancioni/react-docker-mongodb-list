import { Bond } from "./bonds.model";

export default class BondsService {
  static async list(queryParams: any) {
    try {
      return await Bond.find({}).sort({ name: 1 });
    } catch (error) {
      throw error;
    }
  }
}
