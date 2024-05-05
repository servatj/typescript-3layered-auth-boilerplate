import { Collection, Db } from "mongodb";

import { User } from "@src/entities/user-entity";

import { IUserRepository } from "./user-repository-interface";

export class UserRepository implements IUserRepository {
  users: Collection<User>;

  constructor(db: Db) {
    this.users = db.collection<User>("users");
  }

  async createUser(user: User): Promise<User> {
    const result = await this.users.insertOne(user);
    logger.info(`User created with id: ${JSON.stringify(result)}`);
    logger.debug(user);
    return user;
  }

  async getUserById(id: string): Promise<User> {
    if (id === undefined) {
      throw new Error("ID is missing");
    }

    const result = await this.users.findOne({ _id: id });

    if (result === null) {
      throw new Error(`User with ID ${id} not found`);
    }
    return result;
  }

  async updateUser(user: User): Promise<User> {
    const result: User | null = await this.users.findOneAndUpdate(
      { _id: user.id.toString() },
      { $set: user },
    );
    return result!;
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.deleteOne({ _id: id });
  }
}
