import { Router } from "express";
import { checkSchema } from "express-validator";

import * as userController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin, validateUserExists } from "../utils/middlewares";

const router = Router();

router.get("/", requireAdmin, userController.getUsers);

router.get("/:id", requireAdmin, userController.getUser);

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  requireAdmin,
  userController.createUser
);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  [requireAdmin, validateUserExists],
  userController.updateUser
);

router.delete(
  "/:id",
  [requireAdmin, validateUserExists],
  userController.deleteUser
);

export default router;
