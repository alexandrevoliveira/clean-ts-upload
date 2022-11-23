import { UUIDGenerator } from '@/domain/contracts/gateways'

export class UniqueId implements UUIDGenerator {
  uuid ({ key }: UUIDGenerator.Input): string {
    const date = new Date()
    return date.getFullYear().toString() +
      `${date.getMonth() + 1}`.padStart(2, '0') +
      date.getDate().toString().padStart(2, '0') +
      date.getHours().toString().padStart(2, '0') +
      date.getMinutes().toString().padStart(2, '0') +
      date.getSeconds().toString().padStart(2, '0') +
      '_' +
      key
  }
}
