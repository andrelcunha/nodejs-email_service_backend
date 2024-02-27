import fastifyPlugin from "fastify-plugin";
import EmailSenderGateway from "../2_adapters/emailSenderGateway";
import SesEmailSender from "../3_infra/infra_ses/sesEmailSender";
import {FastifyInstance} from "fastify";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function emailService(
  fastify: FastifyInstance,
  options: Object
): Promise<void> {
  fastify.decorate("sendEmail", sendEmail);

  async function sendEmail(to: string, subject: string, text: string) {
    const emailSender = new SesEmailSender();
    emailSender.sendEmail(to, subject, text);
  }

  fastify.log.info("Email service plugin loaded");
  return; // Returning a promise is required by fastify-plugin.
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(emailService, {name: "emailService"});
