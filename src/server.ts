import Fastify from "fastify";
import {routes} from "./routes";
import cors from "@fastify/cors";

const app = Fastify({logger: true});
const host = "localhost";
const port = 3000;

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    const address = app.listen({port, host});
  } catch (err) {
    process.exit(1);
  }
};

start();
