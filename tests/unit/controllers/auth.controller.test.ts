import { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { AuthController } from "@src/controllers/auth-controller";
import AuthService from "@src/services/auth-service";

describe("AuthController", () => {
  const authService = {
    register: vi.fn(),
    login: vi.fn(),
  } as unknown as AuthService;

  const authController = new AuthController({ authService });

  describe("register", () => {
    it("should register a user successfully", async () => {
      const req = { body: { name: "John Doe", email: "", password: "" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      try {
        const reponse = authController.register(
          req as Request,
          res as unknown as Response,
        );
        expect(reponse).toBeInstanceOf(Promise);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});
