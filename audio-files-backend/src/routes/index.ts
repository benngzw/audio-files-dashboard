import { Router } from "express";
import usersRouter from "./auth";

const router = Router();

router.use(usersRouter);

export default router;
