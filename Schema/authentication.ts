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
  password: z.string(),
  phone: z
    .string()
    .regex(new RegExp('(?:[0-9]?){6,14}[0-9]$'), { message: 'Must be a valid mobile number' })
});
export type signUpSchemaType = z.infer<typeof signUpSchema>;
