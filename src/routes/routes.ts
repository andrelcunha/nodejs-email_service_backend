import {FastifyInstance, FastifyPluginOptions} from "fastify";

export async function testRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async () => {
    return {ok: true};
  });

  fastify.get("/ping", async () => {
    return "pong";
  });
}
