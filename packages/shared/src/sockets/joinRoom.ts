import { z } from 'zod';
import * as boardSchema from '../boards/board.schema.js';

const joinRoomInputSchema = z.object({
    boardId: boardSchema.id,
});

type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;

export type { JoinRoomInput };
export { joinRoomInputSchema };
