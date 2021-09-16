'use strict'

const superagent = require('superagent')

require('dotenv').config()

const localip = process.env.CLIENTLOCALIP
const publicip = process.env.CLIENTPUBLICIP
const macaddress = process.env.MACADDRESS
const apikey = process.env.APIKEY

function authenticateRoutes(fastify, options, done) {
  fastify.post('/authenticate', async (req, reply) => {
    const { username, password } = req.body
    try {
      const result = await superagent
        .post(
          'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword'
        )
        .send({
          clientcode: username,
          password: password,
        })
        .set('Context-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-UserType', 'USER')
        .set('X-SourceID', 'WEB')
        .set('X-ClientLocalIP', localip)
        .set('X-ClientPublicIP', publicip)
        .set('X-MACAddress', macaddress)
        .set('X-PrivateKey', apikey)
      reply.send(result.text)
    } catch (error) {
      console.log(error)
    }
  })

  done()
}

module.exports = authenticateRoutes
