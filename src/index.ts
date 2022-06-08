import Fastify from 'fastify';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({
  logger: true
});

const prisma = new PrismaClient();
const redis = new Redis({
  host: "redis-15340.c293.eu-central-1-1.ec2.cloud.redislabs.com",
  port: 15340,
  username: 'default',
  password: 'SDkmFLmNJB0PJS91w14PD1QRcmWQX028'
});

const PORT = process.env.PORT || 3000;
let requestNumber = 0;

fastify.get('/', (
  _,
  reply
) => {
  requestNumber += 1;

  reply.send(`This server is running! And served ${requestNumber} request(s)`);
})

fastify.get('/posts', async (
  _,
  reply
) => {
  const post = await prisma.post.findMany();

  await redis.set('hello', 'test');

  const data = await redis.get('hello');

  reply.send({ post, data })
})

fastify.post('/post', async (
  _,
  reply
) => {
  const post = await prisma.post.create({
    data: {
      title: 'hello!'
    }
  })

  reply.send(post)
})

const main = async () => {
  fastify.listen(PORT, '0.0.0.0', function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

void main();
