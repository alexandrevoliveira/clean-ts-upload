import { NodeStream } from '@/infra/gateways'

export const makeNodeStream = (): NodeStream => {
  return new NodeStream()
}
