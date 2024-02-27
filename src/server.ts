import Fastify from "fastify";
import {testRoutes} from "./routes";
import cors from "@fastify/cors";
import {config} from "./plugins/config";
import emailServicePlugin from "./modules/email_service/plugins/emailServicePlugin";
import emailServiceRoutes from "./modules/email_service/routes/emailServiceRoutes";

const app = Fastify({logger: true});
const host = config.HOST || "localhost";
const port = config.PORT ? +config.PORT : 3000;

const start = async () => {
  app.register(emailServicePlugin);
  await app.register(cors);
  /* Route */
  await app.register(testRoutes);
  await app.register(emailServiceRoutes, {prefix: "api"});

  try {
    await app.listen({
      port,
      host,
    });
  } catch (err) {
    process.exit(1);
  }
};

start();
