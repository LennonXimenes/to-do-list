import { z } from "zod";

const todoSchema = z.object({
    id: z.number().positive(),
    title: z.string().max(20).min(3),
    text: z.string().max(100).min(3),
})

const todoCreateSchema = todoSchema.omit({ id: true });
const todoUpdateSchema = todoCreateSchema.partial();

export { todoSchema, todoCreateSchema, todoUpdateSchema };