import compression from "compression";
import express from "express";
import helmet from "helmet";

import routes from "./routes/v1";

const app = express();
const APP_PORT = 3000;

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

app.use("/v1", routes);

app.listen(APP_PORT, () => {
  console.log(`App started at http://localhost:${APP_PORT}`);
});
