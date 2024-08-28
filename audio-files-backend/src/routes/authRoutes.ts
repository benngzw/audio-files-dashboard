import passport from "passport";
import { Router } from "express";

import { User } from "../models/userModel";
import * as AuthController from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and authorization operations
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "user_id"
 *                 username:
 *                   type: string
 *                   example: "admin"
 *                 displayName:
 *                   type: string
 *                   example: "Admin User"
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Access denied
 */
router.post("/login", passport.authenticate("local"), AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Failed to logout
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post("/logout", AuthController.logout);

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Get authentication status
 *     description: Retrieves the status of the authenticated user.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "user_id"
 *                 username:
 *                   type: string
 *                   example: "admin"
 *                 displayName:
 *                   type: string
 *                   example: "Admin User"
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 */
router.get("/status", AuthController.status);

export default router;
