import Service from "./bonds.service";

export default class BondsController {

  static async list(req: any, res: any) {
    try {
      const response = await Service.list(req.query);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).send(error);
    }
  }

}
