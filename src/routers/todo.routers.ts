import { Router } from "express";
import todoControllers from "../controllers/todo.controllers";
import { validateBody, validateIdExists, verifyToken, verifyUserPermission } from "../middlewares";
import { todoUpdateSchema } from "../schemas";

const todoRouter: Router = Router();

todoRouter.post("/:userId", verifyToken, verifyUserPermission, todoControllers.createTodo);
todoRouter.get("", todoControllers.readTodo);
todoRouter.patch("/:todoId", verifyToken, verifyUserPermission, validateIdExists, validateBody(todoUpdateSchema), todoControllers.updateTodo);
todoRouter.delete("/:todoId", todoControllers.deleteTodo);

export default todoRouter;
