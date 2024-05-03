import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import { uniqueEmail, validateIdExists, validateUsernameExists, verifyToken, verifyUserPermission } from "../middlewares";


const userRouter: Router = Router();

userRouter.post("", validateUsernameExists, uniqueEmail, userControllers.createUser);
userRouter.get("", userControllers.readUser);

userRouter.use("/:userId", verifyToken, verifyUserPermission, validateIdExists);

userRouter.get("/:userId/todos", userControllers.getUserTodos);

export default userRouter;