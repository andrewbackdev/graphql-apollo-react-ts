import { Resolvers } from '../../generated/schema.js'
import { getJobsByCompany } from '../../db/jobs.js'
import * as CompanyService from './company.service.js'

export const CompanyResolvers: Resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await CompanyService.getCompany(id)
      return company
    },
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
}
