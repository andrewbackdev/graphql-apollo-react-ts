import { GraphQLError } from 'graphql'

export function notFoundException(message: string) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  })
}
