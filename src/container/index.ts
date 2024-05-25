import {
  asClass,
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
} from "awilix";
import { Db } from "mongodb";

import { App } from "@src/app";
import { AuthController } from "@src/controllers/auth-controller";
import { DbClient } from "@src/database";
import { UserRepository } from "@src/repository/user-repository";
import { AuthRoutes } from "@src/routes/auth-routes";
import { CommonRoutes } from "@src/routes/common-routes";
import { Server } from "@src/server";
import AuthService from "@src/services/auth-service";

async function configureContainer(): Promise<AwilixContainer> {
  interface IDeps {
    app: App;
    server: Server;
    authController: AuthController;
    authService: AuthService;
    authRoutes: AuthRoutes;
    commonRoutes: CommonRoutes;
    userRepository: UserRepository;
    dbClient: Db;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const container = createContainer<IDeps>({
    injectionMode: InjectionMode.PROXY,
    //strict: true,
  });

  // Ensure DB connection is established before resolving other dependencies
  const dbClient = new DbClient();
  const db = await dbClient.getDb(); // Ensure this method is properly handling async operations

  container.register({
    app: asClass(App).singleton(),
    server: asClass(Server),
    authService: asClass(AuthService),
    dbClient: asValue(db),
    authController: asClass(AuthController),
    authRoutes: asClass(AuthRoutes),
    commonRoutes: asClass(CommonRoutes),
    userRepository: asClass(UserRepository)
      .scoped()
      .inject(() => ({ dbClient: db })),
  });

  return container;
}

export default configureContainer;
