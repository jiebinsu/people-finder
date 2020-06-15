import app from "./app";

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.log(`App started at http://localhost:${APP_PORT}`);
});
