import { getRoomPresence } from "@/lib/sockets/roomUtils.js";
import { AppServer, AppSocket } from "@/sockets/types.js";

const disconnectSocket = async (io: AppServer, socket: AppSocket) => {
    console.log(`${socket.id} has disconnected`);

    // Notify user left room
    const currentBoardId = socket.data.currentBoardId;
    if (currentBoardId) {
        const remainingViewers = await getRoomPresence(io, currentBoardId);

        // disconnection occurs after leaving rooms
        // if user still viewing on another tab (aka still viewing after disconnecting), do not emit user left room!
        const isUserStillViewing = remainingViewers.some((user) => user.id === socket.data.user.id)
        if (!isUserStillViewing){
            socket.to(currentBoardId).emit('board:user-left-room', { userId: socket.data.user.id })
        }
    }
}

export { disconnectSocket }