import { Resolvers } from './generated/schema.js'
import { CompanyResolvers } from './api/company/company.resolver.js'
import { JobResolvers } from './api/job/job.resolver.js'
import { mergeDeep } from './app/utils/merge-deep.js'

export const resolvers: Resolvers = mergeDeep(
  {},
  CompanyResolvers,
  JobResolvers
)
