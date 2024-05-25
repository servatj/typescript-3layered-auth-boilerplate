import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "@src/repository/user-repository";

class AuthService {
  userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async register(username: string, password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    logger.info(`User with username ${username} ${hashedPassword} created`);
    return "User created successfully";
  }

  async login(username: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash("your_password", 10);
    const passwordIsValid = await bcrypt.compare(password, hashedPassword);
    if (!passwordIsValid) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ username }, "your_secret_key", {
      expiresIn: "1h",
    });
    return token; // Return the JWT token
  }
}

export default AuthService;
