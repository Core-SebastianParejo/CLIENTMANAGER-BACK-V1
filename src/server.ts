import app from "./app.js"
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`App Listening on http://Localhost:${env.PORT}/api`);
});