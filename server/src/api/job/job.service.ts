import { notFoundException } from '../../app/exceptions/index.js'
import * as JobRepository from '../../db/jobs.js'

export async function getJob(id: string) {
  const job = await JobRepository.getJob(id)
  if (!job) {
    throw notFoundException('No Job found with id ' + id)
  }
  return job
}

export async function getJobs({
  limit,
  offset,
}: {
  limit?: number
  offset?: number
}) {
  const items = await JobRepository.getJobs(limit, offset)
  const totalCount = await JobRepository.countJobs()
  return { items, totalCount }
}

export async function createJob({
  title,
  description,
  companyId,
}: {
  title: string
  description?: string
  companyId: string
}) {
  return JobRepository.createJob({ companyId, title, description })
}

export async function updateJob({
  id,
  title,
  description,
  companyId,
}: {
  id: string
  title: string
  description?: string
  companyId: string
}) {
  const job = await JobRepository.updateJob({
    id,
    companyId,
    title,
    description,
  })

  if (!job) {
    throw notFoundException('No Job found with id ' + id)
  }
  return job
}

export async function deleteJob(id: string, companyId: string) {
  const job = await JobRepository.deleteJob(id, companyId)
  if (!job) {
    throw notFoundException('No Job found with id ' + id)
  }

  return job
}
