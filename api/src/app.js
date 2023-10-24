import Server from './server/server.js'
import * as dotenv from 'dotenv'
import cron from 'node-cron'
import {checkVencimientoCxC, checkVencimientoCxP} from './helpers/Daemon.js'
dotenv.config()

const server = new Server()

server.listen()
// Tarea programada a las 2:30 PM todos los días
cron.schedule('02 01 * * *', () => {
    console.log('Tarea programada ejecutada a las 00: PM');
    checkVencimientoCxC
    checkVencimientoCxP
    // Agrega aquí la lógica de tu tarea programada
  });