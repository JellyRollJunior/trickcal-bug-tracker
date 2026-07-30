import type { AppServer, AppSocket } from "@/sockets/types.js";
import { JoinRoomInput } from "@trickcal-bug-tracker/shared";
import { joinRoom } from "@/sockets/roomHandler.js";

const registerEventHandlers = (io: AppServer) => {
    io.on('connection', (socket: AppSocket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('board:joinRoom', (input: JoinRoomInput) => joinRoom(socket, input))
    })
}

export { registerEventHandlers }