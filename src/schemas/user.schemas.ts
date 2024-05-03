import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).min(3),
    email: z.string().max(50),
    password: z.string().max(50),
    admin: z.boolean().default(false),
})

const userCreateSchema = userSchema.omit({ id: true });

export { userSchema, userCreateSchema };