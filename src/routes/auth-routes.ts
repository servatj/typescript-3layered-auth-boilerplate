import { Router } from "express";

import { AuthController } from "@src/controllers/auth-controller";
export class AuthRoutes {
  private router: Router;

  private controller: AuthController;

  constructor({ authController }: { authController: AuthController }) {
    this.controller = authController;
    this.router = Router();
    this.init();
  }

  private init() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
    this.router.post("/login", this.controller.login.bind(this.controller));
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
    this.router.post(
      "/register",
      this.controller.register.bind(this.controller),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
