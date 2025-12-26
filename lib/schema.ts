import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10,{error:'Ridi!'}).optional(),
});

export type User = z.infer<typeof userSchema>;