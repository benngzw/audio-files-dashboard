import { Router } from "express";
import { checkSchema } from "express-validator";

import * as userController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";

const router = Router();

router.post(
  "/",
  checkSchema(createUserValidationSchema),
  userController.createUser
);

export default router;
