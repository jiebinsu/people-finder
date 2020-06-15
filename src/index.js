import app from "./app";
import { APP_PORT } from "./config";

app.listen(APP_PORT, () => {
  console.log(`App started at http://localhost:${APP_PORT}`);
});
