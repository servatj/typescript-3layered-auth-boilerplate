import { NextFunction, Request, Response } from "express";

import AuthService from "@src/services/auth-service";
import { userSchema } from "@src/validators/user-schema";

export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validateUser = userSchema.parse(req.body);
      logger.info(validateUser);
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ token: "your-auth-token" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Internal server error` });
        return;
      }
    }
  }
}
