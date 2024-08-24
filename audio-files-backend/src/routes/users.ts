import { Router } from "express";
import { checkSchema } from "express-validator";

import * as userController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin } from "../utils/middlewares";

const router = Router();

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  userController.createUser
);

router.get("/", requireAdmin, userController.getUsers);

export default router;
