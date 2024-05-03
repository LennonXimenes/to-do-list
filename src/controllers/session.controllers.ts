import { Request, Response } from "express";
import { iSessionReturn } from "../interfaces";
import sessionServices from "../services/session.services";

const createSession = async (req: Request, res: Response): Promise<Response> => {
    const token: iSessionReturn = await sessionServices.createSession(req.body);
    return res.status(201).json(token);
};

export default { createSession };