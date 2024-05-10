import { Router } from "express";

import { authService } from "@src/container";
import { AuthController } from "@src/controllers/auth-controller";

class AuthRoutes {
  private router: Router;

  private controller: AuthController = new AuthController(authService);

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
    this.router.post("/login", this.controller.login);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
    this.router.post("/register", this.controller.register);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
