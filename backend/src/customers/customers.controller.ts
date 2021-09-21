import Service from "./customers.service";

export default class UsersController {
  static async list(req: any, res: any) {
    try {
      res.status(200).json(await Service.list(req.query));
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
