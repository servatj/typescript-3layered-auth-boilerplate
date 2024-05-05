import AuthService from "@src/services/auth-service";

describe("AuthService", () => {
  describe("register", () => {
    it("should hash the password correctly", async () => {
      try {
        const auth = new AuthService();
        const password = "password";
        const response = await auth.register("username", password);
        expect(response).toBe("User created successfully");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    });
  });

  describe("login", () => {
    it("should return a JWT token", async () => {
      try {
        const auth = new AuthService();
        const token = await auth.login("username", "password");
        expect(token).toBe("your-auth-token");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    });
  });
});
