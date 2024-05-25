import "./logger";

import http from "node:http";

import { Express } from "express";

import { config } from "@src/config/config";
export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer?: http.Server;

  constructor({ app }: { app: Express }) {
    this.app = app;
    this.port = Number(config.server.port);
  }

  async start(): Promise<void> {
    console.log(this.app);
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
