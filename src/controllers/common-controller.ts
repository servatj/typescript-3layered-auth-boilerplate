import { Request, Response } from "express";

export class CommonController {
  public health(req: Request, res: Response): void {
    const healthCheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };
    try {
      res.status(200).send(healthCheck);
    } catch (error) {
      if (error instanceof Error) {
        healthCheck.message = `${error.message}`;
      }
      res.status(503).send();
    }
  }
}
