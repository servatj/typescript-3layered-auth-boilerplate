import { User } from "@src/models/user-model";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
