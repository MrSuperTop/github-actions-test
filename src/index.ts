import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

const PORT = process.env.PORT || 3000

fastify.get('/', (_, reply) => {
  reply.send('This server is running!')
})

fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
