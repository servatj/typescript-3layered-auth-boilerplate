import "@src/config/load-env-vars";

import configureContainer from "./container";
import { Server } from "./server";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const container = await configureContainer();

  const server = container.resolve<Server>("server");

  await server.start().catch((error: unknown) => {
    if (error instanceof Error) {
      logger.error(error);
    }
  });
})();
