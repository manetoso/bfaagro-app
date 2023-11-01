import Server from './server/server.js'
import * as dotenv from 'dotenv'
dotenv.config()

const server = new Server()

server.listen()
