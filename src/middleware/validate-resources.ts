import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { z } from "zod";

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      logger.error("validation error middleware");
      logger.info(error instanceof z.ZodError);
      next(error);
    }
  };
