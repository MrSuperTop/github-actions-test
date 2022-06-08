import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.get('/', (_, reply) => {
  reply.send('This server is running!')
})

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
