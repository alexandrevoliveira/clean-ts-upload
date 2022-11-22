import { UniqueId } from '@/infra/gateways'

export const makeUniqueId = (): UniqueId => {
  return new UniqueId()
}
