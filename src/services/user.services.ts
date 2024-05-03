import format from "pg-format";
import { iUser, iUserCreate, iUserResult } from "../interfaces";
import { client } from "../database";
import { userCreateSchema } from "../schemas";

const createUser = async (payload: any): Promise<any> => {
    const parsedPayload: iUserCreate = userCreateSchema.parse(payload)

    const queryFormat: string = format(
        `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(parsedPayload),
        Object.values(parsedPayload)
    );

    const queryResult: iUserResult = await client.query(queryFormat);

    return queryResult.rows[0];
}

const readUser = async (): Promise<Array<iUser>> => {
    const queryResult: iUserResult = await client.query(
        `SELECT * FROM "users";`
    );

    return queryResult.rows;
}

const getUserTodos = async (userId: number) => {
    const query = {
        text: `SELECT * FROM "todo" WHERE "users_id" = $1;`,
        values: [userId],
    };
    const queryResult = await client.query(query);
    return queryResult.rows;
}

export default { createUser, readUser, getUserTodos };