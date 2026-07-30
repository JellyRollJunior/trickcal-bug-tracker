import { z } from 'zod';

const id = z.uuid();
const name = z.string();
const description = z.string();

export { id, name, description }