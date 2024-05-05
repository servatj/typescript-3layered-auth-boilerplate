import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(500);
  res.json({ error: error.message });
};

export default errorMiddleware;
