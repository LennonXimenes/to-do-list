import { Request, Response } from "express";
import { iUser } from "../interfaces";
import { userService } from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUser = await userService.createUser(req.body);

    return res.status(201).json(user);
}

const readUser = async (req: Request, res: Response): Promise<Response> => {
    const users: Array<iUser> = await userService.readUser();

    return res.status(200).json(users);
}

const getUserTodos = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.userId);
    
    const todos = await userService.getUserTodos(userId);

    return res.status(200).json(todos);
}

export default { createUser, readUser, getUserTodos };