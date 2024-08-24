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

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  requireAdmin,
  userController.updateUser
);

export default router;
