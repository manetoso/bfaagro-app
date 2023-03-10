import cors from 'cors'
import express from 'express'
import hola from '../routes/hola.routes.js'
// const { dbConection } = require('../database/config')
class Server {
  constructor() {
    //  Creation of app with express
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      hola: '/api'
    }

    // Func to Connect DB
    // this.conectDB()

    this.middlewares()

    this.routes()
  }

  async conectDB() {
    // await dbConection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // Read and Parse of request from body
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.hola, hola)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening at http://localhost:${this.port}`)
    })
  }
}

export default Server
