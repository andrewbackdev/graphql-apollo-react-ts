import {
  notFoundException,
  unauthorizedException,
} from '../../app/exceptions/index.js'
import {
  countJobs,
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from '../../db/jobs.js'
import { Resolvers } from '../../generated/schema.js'
import { toIsoDate } from '../../app/utils/to-iso-date.js'
import * as JobService from './job.service.js'

function requireAuth(user) {
  if (!user) {
    throw unauthorizedException('Missing authentication')
  }
}

export const JobResolvers: Resolvers = {
  Query: {
    job: async (_root, { id }) => {
      const job = await JobService.getJob(id)
      return job
    },
    jobs: async (_root, { limit, offset }) => {
      const { items, totalCount } = await JobService.getJobs({ limit, offset })
      return { items, totalCount }
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      requireAuth(user)

      return JobService.createJob({
        companyId: user.companyId,
        title,
        description,
      })
    },

    deleteJob: async (_root, { id }, { user }) => {
      requireAuth(user)

      const job = await JobService.deleteJob(id, user.companyId)
      return job
    },

    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user }
    ) => {
      requireAuth(user)

      const job = await JobService.updateJob({
        id,
        companyId: user.companyId,
        title,
        description,
      })

      return job
    },
  },

  Job: {
    company: (job, _args, { companyLoader }) => {
      return companyLoader.load(job.companyId)
    },
    date: (job) => toIsoDate(job.createdAt),
  },
}
