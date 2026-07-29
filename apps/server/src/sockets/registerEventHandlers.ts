import { Server } from "socket.io";

const registerEventHandlers = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);
    })
}

export { registerEventHandlers }