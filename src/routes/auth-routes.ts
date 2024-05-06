import { Router } from "express";

import { AuthController } from "@src/controllers/auth-controller";
import { validateResource } from "@src/middleware/validate-resources";
import { userSchema } from "@src/validators/user-schema";

class AuthRoutes {
  private router: Router;

  private controller: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post(
      "/login",
      validateResource(userSchema),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
      this.controller.login,
    );
    this.router.post(
      "/register",
      validateResource(userSchema),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
      this.controller.register,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
