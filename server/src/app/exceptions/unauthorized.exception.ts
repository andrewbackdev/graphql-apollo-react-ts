import { GraphQLError } from 'graphql'

export function unauthorizedException(message: string) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  })
}
