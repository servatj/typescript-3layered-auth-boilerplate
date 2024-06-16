// tests/auth-controller.spec.ts
// eslint-disable-next-line node/no-extraneous-import
import { expect, test } from "@playwright/test";

test("register user successfully", async ({ request }) => {
  const baseURL = "http://localhost:4000";
  const response = await request.post(`${baseURL}/register`, {
    data: {
      name: "John Doe",
      email: "john.doe1@example.com",
      password: "password1234",
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toEqual({ message: "User registered successfully" });
});

test("Login User", async ({ request }) => {
  const baseURL = "http://localhost:4000";
  const response = await request.post(`${baseURL}/login`, {
    data: {
      name: "John Doe",
      email: "john.doe1@example.com",
      password: "password1234",
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("token");
});
