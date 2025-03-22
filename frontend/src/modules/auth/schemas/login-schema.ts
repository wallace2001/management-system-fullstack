import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Invalid username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
