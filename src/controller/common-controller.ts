import { Request, Response } from "express";

export class CommonController {
  public health(req: Request, res: Response): void {
    res.status(200).send("OK");
  }
}
