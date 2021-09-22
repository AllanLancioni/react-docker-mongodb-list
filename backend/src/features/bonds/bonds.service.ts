import { Bond } from "./bonds.model";

export default class BondsService {
  static async list(queryParams: any) {
    try {
      const query = {
        ...queryParams.search
          ? { title: { $regex: queryParams.search, $options: "i" } }
          : {}
      };
      return await Bond.find(query).sort({ name: 1 });
    } catch (error) {
      throw error;
    }
  }
}
