import { Router } from "express";
import audioRouter from "./audioRoutes";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";

const router = Router();

router.use("/audio", audioRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
