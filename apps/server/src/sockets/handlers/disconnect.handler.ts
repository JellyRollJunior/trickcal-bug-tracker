import { AppSocket } from "@/sockets/types.js";

const disconnectSocket = (socket: AppSocket) => {
    console.log(`${socket.id} has disconnected`);

    // Notify user left room
    const currentBoardId = socket.data.currentBoardId;
    if (currentBoardId) {
        socket.to(currentBoardId).emit('board:user-left-room', { userId: socket.data.user.id })
    }
}

export { disconnectSocket }