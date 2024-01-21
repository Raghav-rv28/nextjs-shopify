import * as z from 'zod';
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string()
});
export type signUpSchemaType = z.infer<typeof signUpSchema>;
