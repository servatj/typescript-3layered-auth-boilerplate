import { Request, Response } from "express";

import { User } from "@src/models/user-model";
import { userCreateDTO, userUpdateDTO } from "@src/models/user-model";
import { UserService } from "@src/services/user-service";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request<object, object, User>, res: Response) {
    if (req.body === undefined) {
      res.status(400).send("Body is missing");
      return;
    }

    const userObject = userCreateDTO(req.body);
    const user = await this.userService.createUser(userObject);
    res.json(user);
  }

  async updateUser(
    req: Request<{ id: string }, object, Partial<User>>,
    res: Response,
  ) {
    if (req.body === undefined) {
      res.status(400).send("Body is missing");
      return;
    }

    if (req.params.id === undefined) {
      res.status(400).send("ID is missing");
      return;
    }

    if (req.body.name === undefined && req.body.email === undefined) {
      res.status(400).send("Name or email is required");
      return;
    }

    const userID = Number(req.params.id);

    const userObject = userUpdateDTO(userID, req.body);
    const user = await this.userService.updateUser(userObject);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  }
}
