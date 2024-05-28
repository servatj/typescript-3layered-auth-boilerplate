import { User } from "@src/models/user-model";

export interface IUserRepository {
  createUser(name: string, email: string, password: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<User | undefined>;
  deleteUser(id: string): Promise<void>;
}
