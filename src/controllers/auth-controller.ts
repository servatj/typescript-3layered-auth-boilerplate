import { Request, Response } from "express";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ error: `Internal server error ${error.message}` });
        return;
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ token: "your-auth-token" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ error: `Internal server error ${error.message}` });
        return;
      }
    }
  }
}
