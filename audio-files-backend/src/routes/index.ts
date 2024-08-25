import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import audioRouter from "./audioRoutes";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import swaggerSpec from "../swagger";

const router = Router();

router.use("/audio", audioRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
