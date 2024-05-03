import { Request, Response } from "express";
import { iTodo, iTodoCreate } from "../interfaces";
import { todoServices } from "../services";

const createTodo = async (req: Request, res: Response): Promise<Response> => {
    const todo: iTodo = await todoServices.createTodo(req.body, res.locals.decoded.sub);

    return res.status(201).json(todo);
}


const readTodo = async (req: Request, res: Response): Promise<Response> => {
    const todo: Array<iTodo> = await todoServices.readTodo();

    return res.status(200).json(todo);
}

const updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    const { todoId } = req.params;

    const todo: iTodo = await todoServices.updateTodo(todoId, body);

    return res.status(200).json(todo);
}

const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const todoId: string = req.params.todoId

    await todoServices.deleteTodo(todoId);

    return res.status(204).json();
}

export default { createTodo, readTodo, updateTodo, deleteTodo };