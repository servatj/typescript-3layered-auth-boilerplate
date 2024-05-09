import "./logger";

import http from "node:http";

import { Express } from "express";

import app from "@src/app";
import { config } from "@src/config/config";

export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer?: http.Server;

  constructor() {
    this.app = app;
    this.port = Number(config.server.port);
  }

  async start(): Promise<void> {
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
