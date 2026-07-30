import { z } from 'zod';
import { boardIdSchema } from '../boards/board.schema.js';

const joinRoomInputSchema = z.object({
    boardId: boardIdSchema,
});

type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;

export type { JoinRoomInput };
export { joinRoomInputSchema };
