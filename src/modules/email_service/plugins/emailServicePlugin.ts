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

  async function sendEmail(to: string, subject: string, body: string) {
    const emailSender = new SesEmailSender();
    await emailSender.sendEmail(to, subject, body);
  }

  fastify.log.info("Email service plugin loaded");
  return;
}

export default fastifyPlugin(emailService, {name: "emailService"});
