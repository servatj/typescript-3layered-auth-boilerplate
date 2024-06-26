import { Router } from "express";

import { CommonController } from "@src/controllers/common-controller";

export class CommonRoutes {
  private router: Router;
  private controller: CommonController = new CommonController();

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/health", (req, res) => {
      // console.log("Health check", req, res);
      this.controller.health(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const commonRoutes = new CommonRoutes();
