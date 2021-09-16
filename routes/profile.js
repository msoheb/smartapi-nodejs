'use strict'

const superagent = require('superagent')

require('dotenv').config()

const localip = process.env.CLIENTLOCALIP
const publicip = process.env.CLIENTPUBLICIP
const macaddress = process.env.MACADDRESS
const apikey = process.env.APIKEY

function profileRoute(fastify, opions, done) {
  fastify.get('/profile', async (req, reply) => {
    const token = req.headers.authorization
    console.log(token)
    try {
      const result = await superagent
        .get(
          'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile'
        )
        .set('Authorization', `Bearer ${token}`)
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

module.exports = profileRoute
