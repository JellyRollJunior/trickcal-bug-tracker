import { z } from 'zod';

const boardSchema = {
    id: z.uuid(),
    name: z.string(),
    description: z.string(),
};

export { boardSchema };
