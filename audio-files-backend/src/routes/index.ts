import { Router } from "express";
import audioRouter from "./audio";
import authRouter from "./auth";
import usersRouter from "./users";

const router = Router();

router.use("/audio", audioRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
