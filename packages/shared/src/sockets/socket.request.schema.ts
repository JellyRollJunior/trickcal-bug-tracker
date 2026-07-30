import { z } from 'zod';
import { boardSchema } from '../features/boards/board.schema.js';

const joinRoomInputSchema = z.object({
    boardId: boardSchema.id,
});

type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;

export type { JoinRoomInput };
export { joinRoomInputSchema };
