import Service from "./dashboard.service";

export default class UsersController {
  static async brief(req: any, res: any) {
    try {
      res.status(200).json(await Service.brief());
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
