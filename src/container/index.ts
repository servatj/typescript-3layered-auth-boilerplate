import * as awilix from "awilix";

import AuthService from "@src/services/auth-service";

interface IDeps {
  authService: AuthService;
}

const { InjectionMode, asClass, createContainer } = awilix;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const container = createContainer<IDeps>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
});

container.register({
  authService: asClass(AuthService),
});

export const authService =
  container.resolve<IDeps["authService"]>("authService");
