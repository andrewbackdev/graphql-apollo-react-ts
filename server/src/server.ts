// libs
import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import { readFile } from 'node:fs/promises'

// auth
import { handleLogin } from './api/auth/auth.controller.js'
import { authMiddleware } from './api/auth/auth.middleware.js'

// others
import { resolvers } from './resolvers.js'
import { getContext } from './app/context.js'
import * as ServerConfig from './config/server.js'

const PORT = process.env.PORT || ServerConfig.Port

const app = express()
app.use(cors(), express.json(), authMiddleware)

app.post('/login', handleLogin)

async function main() {
  const typeDefs = await readFile('./schema.graphql', 'utf8')

  const apolloServer = new ApolloServer({ typeDefs, resolvers })
  await apolloServer.start()
  app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }))

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
  })
}
main()
