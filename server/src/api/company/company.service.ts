import * as CompanyRepository from '../../db/companies.js'
import { notFoundException } from '../../app/exceptions/index.js'

export const getCompany = async (id: string) => {
  const company = await CompanyRepository.getCompany(id)
  if (!company) {
    throw notFoundException('No Company found with id ' + id)
  }
  return company
}
