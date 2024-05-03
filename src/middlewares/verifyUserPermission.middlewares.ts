import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyUserPermission = (req: Request, res: Response, next: NextFunction): void => {
    const { userId } = req.params;
    const { sub, admin } = res.locals.decoded;

    if (admin) return next();

    if (userId !== sub) {
        throw new AppError("Insufficient permissions.", 403);
    }

    return next();
};

export default verifyUserPermission