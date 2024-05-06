import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "@src/config/config";

export function signJwt(
  payload: JwtPayload,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined,
) {
  const signingKey = Buffer.from(config.server.jwt[keyName], "base64").toString(
    "ascii",
  );

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
) {
  const publicKey = Buffer.from(config.server.jwt[keyName], "base64").toString(
    "ascii",
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: undefined,
      };
    }
  }
}
