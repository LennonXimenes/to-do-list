import { NextFunction, Request, Response } from "express";
import { iUserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const validateUsernameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name } = req.body;
    if (!name) return next();

    const query: iUserResult = await client.query(
        'SELECT * FROM "users" WHERE "name" = $1',
        [name]
    );

    if (query.rowCount !== 0) {
        throw new AppError("name already exists", 409);
    }

    return next();
};