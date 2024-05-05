// import { zod } from "zod";

import { User } from "@src/entities/user-entity";

export const userCreateDTO = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
};

export const userUpdateDTO = (user_id: number, user: Partial<User>) => {
  return {
    id: user_id || 1,
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
  };
};

export const userDTO = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

// export const userSchema = zod.object({
//   id: zod.number(),
//   name: zod.string(),
//   email: zod.string().email(),
//   password: zod.string(),
// });
