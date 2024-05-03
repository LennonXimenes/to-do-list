import { z } from "zod";
import { sessionCreate } from "../schemas";

type iSessionCreate = z.infer<typeof sessionCreate>;
type iSessionReturn = { token: string };

export { iSessionCreate, iSessionReturn }