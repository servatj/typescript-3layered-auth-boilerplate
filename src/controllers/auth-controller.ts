import { Request, Response } from "express";

import { ErrorCodes } from "@src/models/error-codes";
import AuthService from "@src/services/auth-service";
import { userSchema } from "@src/validators/user-schema";

export class AuthController {
  authService: AuthService;

  constructor({ authService }: { authService: AuthService }) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const validateUser = userSchema.parse(req.body);
      await this.authService.register(validateUser);
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ErrorCodes.USER_ALREADY_EXISTS.message) {
          res.status(409).json({ status: 409, error: error.message });
        }
        res.status(400).json({ error: error.message });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validateUser = userSchema.parse(req.body);
      const token = await this.authService.login(
        validateUser.name,
        validateUser.email,
        validateUser.password,
      );
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Internal server error` });
      }
    }
  }
}
