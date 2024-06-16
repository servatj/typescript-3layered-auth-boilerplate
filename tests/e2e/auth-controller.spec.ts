// tests/auth-controller.spec.ts
// eslint-disable-next-line node/no-extraneous-import
import { expect, test } from "@playwright/test";

test("register user successfully", async ({ request }) => {
  const baseURL = "http://localhost:4000";
  const response = await request.post(`${baseURL}/register`, {
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toEqual({ message: "User registered successfully" });
});
