import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";

function validation(
  fastify: FastifyInstance,
  options: Object,
  next: Function
): void {
  const isEmail = (email: string): boolean => {
    // Regular expression pattern for a valid email address
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Check if the email is not empty and matches the format
    if (email !== "" && email.match(emailFormat)) {
      return true;
    }
    return false;
  };

  fastify.decorate("isEmail", isEmail);
  next();
  return;
}

export default fastifyPlugin(validation, {name: "validation"});
