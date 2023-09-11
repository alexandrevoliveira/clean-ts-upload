export interface WriteStream {
  writeOn: (input: WriteStream.Input) => WriteStream.Output
}

export namespace WriteStream {
  export type Input = {
    item: any
    itemPath: string
  }

  export type Output = Promise<void>
}
