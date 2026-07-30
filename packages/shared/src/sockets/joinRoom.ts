import { z } from 'zod';
import { boardIdSchema } from '../boards/board.schema';

const joinRoomSchema = z.object({
    boardId: boardIdSchema,
});

type JoinRoomInput = z.infer<typeof joinRoomSchema>;

export type { JoinRoomInput };
export { joinRoomSchema };
