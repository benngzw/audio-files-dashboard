import { Router } from "express";
import { checkSchema } from "express-validator";

import { userController } from "../controllers";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin, validateUserExists } from "../utils/middlewares";

const router = Router();

router.use(requireAdmin);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  userController.createUser
);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  validateUserExists,
  userController.updateUser
);

router.delete("/:id", validateUserExists, userController.deleteUser);

export default router;
