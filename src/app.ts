import express from "express";

import errorMiddleware from "./middleware/error-middleware";
import { authRoutes } from "./routes/auth-routes";
import { commonRoutes } from "./routes/common-routes";

const app = express();

app.use(express.json());
app.use(commonRoutes.getRouter());
app.use(authRoutes.getRouter());
app.use(errorMiddleware);

export default app;
