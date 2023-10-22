import { serverSocket } from '../app.js'

const sendMessageToClient = (message = '') => {
    try {
        serverSocket.on('connection', function (socket) {
            // send a message to the client
            socket.emit('messagesFromServer', {
                message: message
            })
        })
    } catch (error) {
        console.log(error);
    }
}

export { sendMessageToClient }