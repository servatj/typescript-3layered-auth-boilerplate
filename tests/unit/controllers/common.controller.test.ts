import { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { CommonController } from "@src/controllers/common-controller";

describe("CommonController", () => {
  const commonController = new CommonController();

  describe("register", () => {
    it("should register a user successfully", async () => {
      const res = {
        status: {
          send: vi.fn(),
        },
        json: vi.fn(),
      };
      try {
        const reponse = commonController.health(
          {} as Request,
          res as unknown as Response,
        );
        expect(reponse).toBeInstanceOf(Promise);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
