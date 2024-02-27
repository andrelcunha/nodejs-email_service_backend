import fastify from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    isEmail: (email: string) => boolean;
    sendEmail: (to: string, subject: string, body: string) => Promise<void>;
  }
}
