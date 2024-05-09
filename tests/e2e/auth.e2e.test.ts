import "../../src/logger";

import * as nock from "nock";
import request from "supertest";

import app from "@src/app";

describe("auth", () => {
  beforeAll(async () => {
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    nock.enableNetConnect();
  });

  describe("/POST register", () => {
    it("should return 200 and a message", async () => {
      const response = await request(app).post("/register").send({
        name: "josep",
        email: "jservatlorca@gmail.com",
        password: "mysecret",
      });
      expect(response.status).toBe(200);
      expect((response.body as { message?: string })?.message).toBe(
        "User registered successfully",
      );
    });
  });
});
