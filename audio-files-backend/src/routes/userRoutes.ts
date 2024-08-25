import { Router } from "express";
import { checkSchema } from "express-validator";

import * as UserController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin, requireCurrentUserOrAdmin } from "../middlewares";

const router = Router();

router.get("/", requireAdmin, UserController.getUsers);

router.get("/:id", requireAdmin, UserController.getUser);

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  UserController.createUser
);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  requireCurrentUserOrAdmin,
  UserController.updateUser
);

router.delete("/:id", requireCurrentUserOrAdmin, UserController.deleteUser);

export default router;
