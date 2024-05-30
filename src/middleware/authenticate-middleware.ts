import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { user } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY || "secret",
    ) as jwt.JwtPayload;
    req.body.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.sendStatus(401);
    }
    return res.sendStatus(403);
  }
};

export default authenticateToken;
