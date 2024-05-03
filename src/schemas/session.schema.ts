import { userSchema } from "./user.schemas";

const sessionCreate = userSchema.pick({
    email: true,
    password: true,
});

export { sessionCreate };