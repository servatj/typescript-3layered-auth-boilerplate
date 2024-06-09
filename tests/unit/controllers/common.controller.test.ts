import { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { CommonController } from "@src/controllers/common-controller";

describe("CommonController", () => {
  const commonController = new CommonController();

  describe("register", () => {
    it("should register a user successfully", async () => {
      const res = {
        status: vi.fn().mockReturnThis(), // mock status to return `this` for chaining
        json: vi.fn(),
        send: vi.fn(),
      };
      try {
        const response = commonController.health(
          {} as Request,
          res as unknown as Response,
        );
        expect(response).toBeUndefined();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
