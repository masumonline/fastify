function photoRoute(fastify, options, done) {

  fastify.get("/photos", (req, reply) => {
    fastify.mysql.getConnection(onConnect);

    function onConnect(err, client) {
      if (err) return reply.send(err);

      client.query("SELECT * FROM photos", function onResult(err, result) {
        client.release();
        reply.send(err || result);
      });
    }
  });

  fastify.get('/photos/:id', (req, reply) => {
    fastify.mysql.getConnection(onConnect)

    function onConnect (err, client) {
      if (err) return reply.send(err)

      client.query(
        'SELECT * FROM photos WHERE id=?', [req.params.id],
        function onResult (err, result) {
          client.release()
          reply.send(err || result)
        }
      )
    }
  });
  done();
}

module.exports = photoRoute;
