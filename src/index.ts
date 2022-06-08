import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000
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
  const post = await prisma.post.findUnique({
    where: {
      id: 1
    }
  })

  reply.send(post)
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
