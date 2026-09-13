import { z } from 'zod';

const baseErrorFields = {
  message: z.string(),
  status: z.number(),
};

const baseErrorSchema = z.object({
  ...baseErrorFields,
  name: z.string(),
});

const authenticationErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('Authentication error'),
  status: z.literal(401),
});

const authorizationErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('Authorization error'),
  status: z.literal(403),
});

const databaseErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('Database error'),
  status: z.literal(500),
});

const notFoundErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('404 not found'),
  status: z.literal(404),
});

const rateLimitErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('Rate limit error'),
  status: z.literal(429),
  timeoutInSeconds: z.number(),
});

const validationErrorSchema = z.object({
  ...baseErrorFields,
  name: z.literal('Validation Error'),
  status: z.literal(400),
  validationErrors: z.record(z.string(), z.array(z.string())),
});

const knownErrorSchema = z.discriminatedUnion('name', [
  authenticationErrorSchema,
  authorizationErrorSchema,
  databaseErrorSchema,
  notFoundErrorSchema,
  rateLimitErrorSchema,
  validationErrorSchema,
]);

export {
  baseErrorSchema,
  authenticationErrorSchema,
  authorizationErrorSchema,
  databaseErrorSchema,
  notFoundErrorSchema,
  rateLimitErrorSchema,
  validationErrorSchema,
  knownErrorSchema,
};