import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

const PORT = process.env.PORT || 3000
let requestNumber = 0;

fastify.get('/', (_, reply) => {
  requestNumber += 1;

  reply.send(`This server is running! And served ${requestNumber} request(s)`)
})

fastify.listen(PORT, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
