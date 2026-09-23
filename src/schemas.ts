import { z } from "zod";

export const pieBodySchema = z.object({
  name: z.string().min(2, "Name must at least be 2 characters."),
  crust_type: z.string().min(2, "Crust type is required."),
  filling: z.string().min(2, "Filling is required."),
  is_baked: z.boolean().optional().default(false),
  slice_count: z
    .number()
    .int()
    .positive("Slice count must be positive.")
    .optional()
    .default(8),
});

// Create a wrapper schema for our generic Express middleware
export const createPieSchema = z.object({
  body: pieBodySchema,
});

export const updatePieSchema = z.object({
  body: pieBodySchema.partial(),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
  }),
});

// Automatically infer TypeScript types from the Zod schemas
export type PieInput = z.infer<typeof pieBodySchema>;

export const authBodySchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authRequestSchema = z.object({
  body: authBodySchema,
});

export type AuthInput = z.infer<typeof authBodySchema>;