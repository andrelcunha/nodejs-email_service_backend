import fastify from "fastify";

// Create a server
const fastfy = fastify();

// Define a route
fastfy.get("/ping", async (request, reply) => {
  return "pong\n";
});

// Run the fastfy
const start = async () => {
  await fastfy.listen({port: 3000}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`fastfy listening at ${address}`);
  });
};

start();
