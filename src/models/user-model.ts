export type User = {
  _id?: string;
  id: number;
  name: string;
  email: string;
  password: string;
};

export const userCreateDTO = (user: User): User => {
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
