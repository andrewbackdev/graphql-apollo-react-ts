import DataLoader from 'dataloader'
import { createCompanyLoader } from '../db/companies.js'
import { getUser } from '../db/users.js'
import { CompanyEntity, UserEntity } from '../db/types.js'

export interface ResolverContext {
  companyLoader: DataLoader<string, CompanyEntity, string>
  user?: UserEntity
}

export async function getContext({ req }): Promise<ResolverContext> {
  const companyLoader = createCompanyLoader()
  const context: ResolverContext = { companyLoader }
  if (req.auth) {
    context.user = await getUser(req.auth.id)
  }
  return context
}
