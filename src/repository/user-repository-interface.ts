import { User } from "@src/entities/user-entity";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
