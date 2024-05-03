import { Router } from "express";
import todoControllers from "../controllers/todo.controllers";
import { validateBody, validateTitleExists, verifyToken, verifyUserPermission, verifyUserTodoPermission } from "../middlewares";
import { todoUpdateSchema } from "../schemas";

const todoRouter: Router = Router();

todoRouter.post("/:userId", verifyToken, verifyUserPermission, validateTitleExists, todoControllers.createTodo);
todoRouter.get("", todoControllers.readTodo);
todoRouter.patch("/:todoId", verifyToken, verifyUserTodoPermission, validateBody(todoUpdateSchema), todoControllers.updateTodo);
todoRouter.delete("/:todoId", verifyToken, verifyUserTodoPermission, todoControllers.deleteTodo);

export default todoRouter;
