function userRoute(fastify, options, done) {
  fastify.get("/user", (req, reply) => {
    fastify.mysql.getConnection(onConnect);

    function onConnect(err, client) {
      if (err) return reply.send(err);

      client.query("SELECT * FROM users", function onResult(err, result) {
        client.release();
        reply.send(err || result);
      });
    }
  });

  fastify.get("/user/:id", (req, reply) => {
    fastify.mysql.getConnection(onConnect);

    function onConnect(err, client) {
      if (err) return reply.send(err);

      client.query(
        "SELECT * FROM users WHERE id=?",
        [req.params.id],
        function onResult(err, result) {
          client.release();
          reply.send(err || result);
        }
      );
    }
  });
  done();
}

module.exports = userRoute;