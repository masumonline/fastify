// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Photos-Api",
      description: 'Building a wrapper api',
      version: "0.0.1",
    },
    host: 'localhost:3000',
    schemes: [
      'http',
      'https'
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

fastify.register(require("../fastify/routers/photosRoute"));
fastify.get("/", async (req, res) => {
  res.send({name: "hi there"});
});


// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
