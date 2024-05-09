import * as nock from "nock";
import request from "supertest";

import app from "@src/app";

describe.only("auth", () => {
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

  it("/GET health", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });
});
