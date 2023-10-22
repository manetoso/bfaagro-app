import Server from './server/server.js'
import { Server as ServerSocket, Socket } from 'socket.io'

import * as dotenv from 'dotenv'
dotenv.config()

const server = new Server()

const serverSocket = new ServerSocket(server.listen())

export { server, serverSocket}
