import compression from "compression";
import express from "express";
import helmet from "helmet";

import routes from "./routes/v1";
import errorHandler from "./middlewares/error-handler";
import "./services/database/redis";

const app = express();

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

app.use("/v1", routes);
app.use(errorHandler);

export default app;
