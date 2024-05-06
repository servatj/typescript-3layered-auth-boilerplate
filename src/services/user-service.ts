import { User } from "../models/user-model";

export class UserService {
  async createUser(user: User): Promise<User> {
    return user;
  }

  async updateUser(user: User): Promise<User> {
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    logger.info(`Deleted user with id ${id}`);
  }
}
