import { QueryResult } from "pg";
import { todoCreateSchema, todoSchema } from "../schemas";
import { z } from "zod";

type iTodo = z.infer<typeof todoSchema>

type iTodoResult = QueryResult<iTodo>;
type iTodoCreate = z.infer<typeof todoCreateSchema>
type iTodoRead = Array<iTodo>;
type iTodoUpdate = Partial<iTodoCreate>;

export { iTodo, iTodoResult, iTodoCreate, iTodoRead, iTodoUpdate };