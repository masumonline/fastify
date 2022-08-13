// Require the framework and instantiate it
const fastify = require("fastify")({ logger: false });

fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root:masumi@localhost:3306/fastify'
})

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
fastify.register(require("../fastify/routers/userRoute"));

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
