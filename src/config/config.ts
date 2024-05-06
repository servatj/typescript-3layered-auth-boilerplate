export type Config = {
  server: {
    port: number;
    jwt: {
      accessTokenPrivateKey: string;
      accessTokenPublicKey: string;
      refreshTokenPrivateKey: string;
      refreshTokenPublicKey: string;
    };
  };
};

export const config: Config = {
  server: {
    port: Number(process.env.PORT) || 3000,
    jwt: {
      accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || "",
      accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY || "",
      refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || "",
      refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY || "",
    },
  },
};
