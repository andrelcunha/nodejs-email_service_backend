import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

const emailBodySchemaSchema = {
  type: "object",
  required: ["to"],
  properties: {
    to: {type: "string"},
    subject: {type: "string"},
    text: {type: "string"},
  },
};
const schema = {
  body: emailBodySchemaSchema,
};

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function emailServiceRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const prefix = "email";

  fastify.get(`/${prefix}`, async (request, reply) => {
    return {Email: "service"};
  });

  fastify.post(`/${prefix}`, async (request, reply) => {
    return request.body;
  });
}

export default emailServiceRoutes;
