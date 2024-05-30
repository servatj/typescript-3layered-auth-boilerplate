import cors from "cors";
import express from "express";

import errorMiddleware from "./middleware/error-middleware";
import { AuthRoutes } from "./routes/auth-routes";
import { CommonRoutes } from "./routes/common-routes";

export class App {
  private readonly app = express();
  authRoutes: AuthRoutes;
  commonRoutes: CommonRoutes;

  constructor({
    authRoutes,
    commonRoutes,
  }: {
    authRoutes: AuthRoutes;
    commonRoutes: CommonRoutes;
  }) {
    this.authRoutes = authRoutes;
    this.commonRoutes = commonRoutes;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initializeRoutes() {
    this.app.use(this.commonRoutes.getRouter().bind(this.commonRoutes));
    this.app.use(this.authRoutes.getRouter());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  getApp() {
    return this.app;
  }
}
