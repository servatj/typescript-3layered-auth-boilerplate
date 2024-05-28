import { Collection, Db } from "mongodb";

import { User } from "@src/models/user-model";

import { IUserRepository } from "./user-repository-interface";

export class UserRepository implements IUserRepository {
  users: Collection<User>;
  dbClient: Db;

  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
    this.users = this.dbClient.collection<User>("users");
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user: User = {
      id: Math.floor(Math.random() * 100),
      name,
      email,
      password,
    };
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

  async updateUser(user: User): Promise<User | undefined> {
    try {
      const result: User | null = await this.users.findOneAndUpdate(
        { _id: user.id.toString() },
        { $set: user },
      );
      return result!;
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Failed to update user: ${error.message}`);
      }
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.findOne({ email });
    if (user === null) {
      logger.info(`User with email ${email} not found`);
      return undefined;
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.deleteOne({ _id: id });
  }
}
