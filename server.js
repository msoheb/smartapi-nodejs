const fastify = require("fastify")({ logger: true });

require("dotenv").config();

const port = process.env.PORT;

(async () => {
  await fastify.listen(port);
})().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
