import { Request, Response } from "express";
import { z } from "zod";

const errorMiddleware = (error: Error, req: Request, res: Response) => {
  if (error instanceof z.ZodError) {
    logger.error("validation error");
    res.status(400).json({ errors: error.errors });
    return;
  }

  if (error instanceof Error) {
    logger.error(error);
    res.status(500).json({ error: `Internal server error` });
    return;
  }
};

export default errorMiddleware;
