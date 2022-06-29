import { createServer } from './utils/createServer';

const PORT = process.env.PORT || 3000;

const main = async () => {
  const fastify = createServer();

  fastify.listen(PORT, '0.0.0.0', function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
}

void main();
