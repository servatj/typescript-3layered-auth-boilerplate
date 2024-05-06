import "./logger";

import http from "node:http";

import express, { Express } from "express";

import { config } from "@src/config/config";

import errorMiddleware from "./middleware/error-middleware";
import { authRoutes } from "./routes/auth-routes";
import { commonRoutes } from "./routes/common-routes";

export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.port = Number(config.server.port);
  }

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(commonRoutes.getRouter());
    this.app.use(authRoutes.getRouter());
    this.app.use(errorMiddleware);

    this.httpServer = this.app.listen(this.port, () => {
      logger.info(`Server running on http://localhost:${this.port}`);
    });
  }

  async stop(): Promise<void> {
    this.httpServer?.close();
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
