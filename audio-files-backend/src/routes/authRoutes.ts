import passport from "passport";
import { Router } from "express";

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
 *         description: OK
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Access denied
 */
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

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
router.post("/logout", (req, res) => {
  if (!req.user) return res.status(403).send({ error: "Access Denied" });
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

// TODO: Remove after testing
router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
