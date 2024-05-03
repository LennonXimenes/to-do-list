import { QueryResult } from "pg";
import { z } from "zod";
import { userCreateSchema, userSchema } from "../schemas";

type iUser = z.infer<typeof userSchema>

type iUserCreate = z.infer<typeof userCreateSchema>
type iUserResult = QueryResult<iUser>;

export { iUser, iUserResult, iUserCreate };