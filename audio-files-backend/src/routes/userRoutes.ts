import { Router } from "express";
import { checkSchema } from "express-validator";

import * as UserController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin, validateUserExists } from "../middlewares";

const router = Router();

router.use(requireAdmin);

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  UserController.createUser
);

router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  validateUserExists,
  UserController.updateUser
);

router.delete("/:id", validateUserExists, UserController.deleteUser);

export default router;
