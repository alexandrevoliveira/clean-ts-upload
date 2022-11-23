import { UniqueId } from '@/infra/gateways'

import { reset, set } from 'mockdate'

describe('UniqueId', () => {
  let sut: UniqueId

  beforeAll(() => {
    set(new Date(2022, 1, 15, 12, 0, 15))
    sut = new UniqueId()
  })

  afterAll(() => {
    reset()
  })

  it('should create a unique id', () => {
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('20220215120015_any_key')
  })
})
