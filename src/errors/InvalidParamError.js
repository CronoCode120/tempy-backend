export class InvalidParamError extends Error {
  constructor(param, value) {
    super(`Invalid ${param} parameter: ${typeof value}`)
  }
}
