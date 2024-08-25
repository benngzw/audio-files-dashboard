import { Router } from "express";
import { checkSchema } from "express-validator";

import * as UserController from "../controllers/userController";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { requireAdmin, requireCurrentUserOrAdmin } from "../middlewares";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "66cb30e3af23afc9d7c76a8b"
 *                   username:
 *                     type: string
 *                     example: "admin"
 *                   displayName:
 *                     type: string
 *                     example: "Admin User"
 *             example:
 *               - id: "66cb30e3af23afc9d7c76a8b"
 *                 username: "admin"
 *                 displayName: "Admin User"
 *               - id: "66cb5a5dfb43d19ca5eb74f3"
 *                 username: "tester1"
 *                 displayName: "Tester 1"
 *               - id: "66cb3bd13595584e03e5e30a"
 *                 username: "tester2"
 *                 displayName: "Tester 2"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get("/", requireAdmin, UserController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66cb5a5dfb43d19ca5eb74f3"
 *                 username:
 *                   type: string
 *                   example: "tester1"
 *                 displayName:
 *                   type: string
 *                   example: "Tester 1"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.get("/:id", requireAdmin, UserController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "tester1"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               displayName:
 *                 type: string
 *                 example: "Tester 1"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66cb5a5dfb43d19ca5eb74f3"
 *                 username:
 *                   type: string
 *                   example: "tester1"
 *                 displayName:
 *                   type: string
 *                   example: "Tester 1"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  checkSchema(createUserValidationSchema),
  UserController.createUser
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "supertester1"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               displayName:
 *                 type: string
 *                 example: "Super Tester 1"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66cb5a5dfb43d19ca5eb74f3"
 *                 username:
 *                   type: string
 *                   example: "supertester1"
 *                 displayName:
 *                   type: string
 *                   example: "Super Tester 1"
 *       400:
 *         description: Failed to update user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.put(
  "/:id",
  checkSchema(createUserValidationSchema),
  requireCurrentUserOrAdmin,
  UserController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Failed to delete user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.delete("/:id", requireCurrentUserOrAdmin, UserController.deleteUser);

export default router;
