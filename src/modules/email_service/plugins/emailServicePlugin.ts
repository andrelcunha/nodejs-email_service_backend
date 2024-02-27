import fastifyPlugin from "fastify-plugin";
import EmailSenderGateway from "../2_adapters/emailSenderGateway";
import {FastifyInstance} from "fastify";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function emailService(fastify: FastifyInstance, options: Object) {}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(emailService);
