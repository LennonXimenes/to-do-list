import format from "pg-format";
import { iTodo, iTodoCreate, iTodoResult, iTodoUpdate } from "../interfaces";
import { client } from "../database";
import { todoCreateSchema, todoUpdateSchema } from "../schemas";

const createTodo = async (payload: iTodoCreate, userId: string): Promise<iTodo> => {
    const queryFormat: string = format(
        `INSERT INTO "todo" (%I, "users_id") VALUES (%L, $1) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: iTodoResult = await client.query(queryFormat, [userId]);

    return queryResult.rows[0];
}

const readTodo = async (): Promise<Array<iTodo>> => {
    const queryResult: iTodoResult = await client.query(
        `SELECT * FROM "todo";`
    );

    return queryResult.rows;
}

const updateTodo = async (todoId: string, payload: iTodoUpdate): Promise<iTodo> => {
    const parsedPayload: iTodoUpdate = todoUpdateSchema.parse(payload)

    const queryFormat: string = format(
        'UPDATE "todo" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(parsedPayload),
        Object.values(parsedPayload)
    );

    const queryResult: iTodoResult = await client.query(queryFormat, [
        todoId,
    ]);

    return queryResult.rows[0];
}

const deleteTodo = async (todoId: string): Promise<void> => {
    await client.query(`DELETE FROM "todo" WHERE "id" = $1;`, [todoId]);
}

export default { createTodo, readTodo, updateTodo, deleteTodo };