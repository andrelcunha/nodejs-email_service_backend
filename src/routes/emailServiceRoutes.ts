import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import emailService from "../modules/email_service/plugins/emailServicePlugin";

const emailBodySchemaSchema = {
  type: "object",
  required: ["to"],
  properties: {
    to: {type: "string"},
    subject: {type: "string"},
    body: {type: "string"},
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
    const emailRequiest: {to: string; subject: string; body: string} = {
      to: "email@email.com",
      subject: "Example",
      body: "Loren ipsum dolor sit amet",
    };
    return emailRequiest;
  });

  fastify.post(
    `/${prefix}`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const {to, subject, body} = request.body;
      if (!to || !subject || !body) {
        console.log("Missing required fields");
        return reply.code(400).send("Missing required fields");
      }
      const isEmailValid = fastify.isEmail(to);
      if (!isEmailValid) {
        return reply.code(400).send("Invalid email");
      }
      try {
        await fastify.sendEmail(to, subject, body);
      } catch (err) {
        return reply.code(500).send(err);
      }
      return reply.code(200).send("Email sent successfully");
    }
  );
}

export default emailServiceRoutes;
