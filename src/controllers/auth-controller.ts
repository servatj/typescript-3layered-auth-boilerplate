import { Request, Response } from "express";

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
        res.status(400).json({ error: error.message });
        return;
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
        return;
      }
    }
  }
}
