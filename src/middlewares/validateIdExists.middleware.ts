import { NextFunction, Request, Response } from "express";
import { iUserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const validateIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;

    const query: iUserResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1',
        [userId]
    );

    if (query.rowCount === 0) {
        throw new AppError("User not found", 404);
    }

    res.locals = { ...res.locals, foundUser: query.rows[0] };

    return next();
};

export default validateIdExists;