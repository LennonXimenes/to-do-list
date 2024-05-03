import { Router } from "express";
import todoControllers from "../controllers/todo.controllers";
import { validateBody, validateIdExists, validateTitleExists, validateUsernameExists, verifyToken, verifyUserPermission } from "../middlewares";
import { todoCreateSchema, todoUpdateSchema } from "../schemas";

const todoRouter: Router = Router();

todoRouter.post("/:userId", verifyToken, verifyUserPermission, validateTitleExists, todoControllers.createTodo);
todoRouter.get("", todoControllers.readTodo);
todoRouter.patch("/:todoId", verifyToken, verifyUserPermission, validateBody(todoUpdateSchema), todoControllers.updateTodo);
todoRouter.delete("/:todoId", verifyToken, verifyUserPermission, todoControllers.deleteTodo);

export default todoRouter;
