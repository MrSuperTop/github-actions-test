import Fastify, { FastifyServerOptions } from 'fastify';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';

export const createServer = (
  options: FastifyServerOptions = {
    logger: true
  }
) => {
  const fastify = Fastify(options);

  const prisma = new PrismaClient();
  const redis = new Redis({
    host: "localhost",
    port: 6379,
  });
  
  let requestNumber = 0;
  
  fastify.get('/', (
    _,
    reply
  ) => {
    requestNumber += 1;
  
    reply.send({
      message: `This server is running! And served ${requestNumber} request(s)`
    });
  })
  
  fastify.get('/posts', async (
    _,
    reply
  ) => {
    const post = await prisma.post.findMany();
  
    await redis.set('hello', 'test');
  
    const data = await redis.get('hello');
  
    reply.send({ post, data });
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
  
    reply.send(post);
  });

  return fastify;
};


