import { NextFunction, Request, Response } from "express";
import { iTodoResult, iUserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const validateTitleExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title } = req.body;
    if (!title) return next();

    const query: iTodoResult = await client.query(
        'SELECT * FROM "todo" WHERE "title" = $1',
        [title]
    );

    if (query.rowCount !== 0) {
        throw new AppError("title already exists", 409);
    }

    return next();
};