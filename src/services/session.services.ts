import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { iSessionCreate, iSessionReturn, iUser, iUserResult } from "../interfaces";

const createSession = async (payload: iSessionCreate): Promise<iSessionReturn> => {
  const query: iUserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [payload.email]
  );

  if (query.rowCount === 0) {
    throw new AppError("Email or password is incorrect.", 401);
  }

  const user: iUser = query.rows[0];

  if (user.password !== payload.password) {
    throw new AppError("Email or password is incorrect.", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { createSession };