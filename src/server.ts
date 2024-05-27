import "./logger";

import http from "node:http";

import { Express } from "express";

import { config } from "@src/config/config";

import { App } from "./app";
export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer?: http.Server;

  constructor({ app }: { app: App }) {
    this.app = app.getApp();
    this.port = Number(config.server.port);
  }

  async start(): Promise<void> {
    this.httpServer = http.createServer(this.app);
    this.httpServer.listen(this.port, () => {
      logger.info(`Server is running on http://localhost:${this.port}`);
    });
  }

  async stop(): Promise<void> {
    this.httpServer?.close();
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
