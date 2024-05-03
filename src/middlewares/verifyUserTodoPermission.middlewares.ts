import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { client } from "../database";

const verifyUserTodoPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { todoId } = req.params;
    const { sub, admin } = res.locals.decoded;

    try {
        if (admin) {
            return next();
        }

        const query = `SELECT "users_id" FROM "todo" WHERE id = $1;`;
        const { rows } = await client.query(query, [todoId]);

        if (!rows || rows.length === 0) {
            throw new AppError("Todo not found.", 404);
        }

        // Verifique se os tipos correspondem ou use uma comparação estrita
        if (rows[0].users_id.toString() !== sub) {
            throw new AppError("Insufficient permissions.", 403);
        }

        return next();
    } catch (error) {
        next(error);
    }
};

export default verifyUserTodoPermission