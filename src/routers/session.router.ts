import { Router } from "express";
import { validateBody } from "../middlewares";
import { sessionCreate } from "../schemas";
import sessionControllers from "../controllers/session.controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", validateBody(sessionCreate), sessionControllers.createSession);

export default sessionRouter;