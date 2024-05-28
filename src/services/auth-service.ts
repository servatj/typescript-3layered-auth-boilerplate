import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "@src/repository/user-repository";

class AuthService {
  userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      logger.info(`User with username ${name} ${hashedPassword} created`);
      await this.userRepository.createUser(name, email, hashedPassword);
      return "User created successfully";
    } catch (error) {
      logger.error(error);
      const error_ =
        error instanceof Error
          ? new Error(error.message)
          : new Error("An unexpected error occurred");
      throw error_;
    }
  }

  async login(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new Error("Invalid username or password");
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new Error("Invalid username or password");
      }
      const token = jwt.sign({ username }, "your_secret_key", {
        expiresIn: "1h",
      });

      return token; // Return the JWT token
    } catch (error) {
      logger.error(error);
      const error_ =
        error instanceof Error
          ? new Error(error.message)
          : new Error("An unexpected error occurred");
      throw error_;
    }
  }
}

export default AuthService;
