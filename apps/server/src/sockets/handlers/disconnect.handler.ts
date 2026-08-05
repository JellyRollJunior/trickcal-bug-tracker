import { AppSocket } from "@/sockets/types.js";

const disconnectSocket = (socket: AppSocket) => {
    console.log(`${socket.id} has disconnected`);
}

export { disconnectSocket }