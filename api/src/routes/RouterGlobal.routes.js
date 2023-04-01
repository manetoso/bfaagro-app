import { Router } from 'express'

class RouterGlobal extends Router {
  #router
  parameters
  constructor() {
    super()
    this.#router = Router()
    this.parameters = {
      uri: '',
      arrayChecks: [],
      method: async () => {}
    }
  }

  getMethod() {
    return this.#router.get(
      this.parameters.uri,
      this.parameters.arrayChecks,
      this.parameters.method
    )
  }

  postMethod(parameters) {
    this.parameters = parameters
    this.#router.post(
      this.parameters.uri,
      this.parameters.arrayChecks,
      this.parameters.method
    )
  }

  putMethod(parameters) {
    this.parameters = parameters
    this.#router.put(
      this.parameters.uri,
      this.parameters.arrayChecks,
      this.parameters.method
    )
  }

  deleteMethod(parameters) {
    this.parameters = parameters
    this.#router.delete(
      this.parameters.uri,
      this.parameters.arrayChecks,
      this.parameters.method
    )
  }

  setParameters(parameters) {
    this.parameters = parameters
  }
}

export default RouterGlobal
