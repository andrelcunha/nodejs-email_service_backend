import Fastify from "fastify";
import {testRoutes} from "./routes/routes";
import cors from "@fastify/cors";
import {config} from "./plugins/config";
import emailServicePlugin from "./modules/email_service/plugins/emailServicePlugin";
import emailServiceRoutes from "./routes/emailServiceRoutes";

const app = Fastify({logger: true});
const host = config.HOST || "localhost";
const port = config.PORT ? +config.PORT : 3000;

app.register(emailServicePlugin);
app.register(cors);
/* Route */
app.register(testRoutes);
app.register(emailServiceRoutes, {prefix: "api"});

app.listen({port, host}, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
