import { Request, Response, NextFunction } from "express";

import { User, UserModel } from "../models/userModel";

/**
 * Middleware function that checks if the user is an admin.
 * If the user is not an admin, it sends a 401 status code.
 * Otherwise, it calls the next middleware function.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns The Express response object or void.
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const user = req.user as User;
  if (!user || !user.isAdmin) return res.sendStatus(401);
  next();
}

/**
 * Middleware function that checks if a user is authenticated.
 * If the user is not authenticated, it sends a 401 status code.
 * Otherwise, it calls the next middleware function.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns The Express response object or void.
 */
export function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const user = req.user as User;
  if (!user) return res.sendStatus(401);
  next();
}

/**
 * Validates if a user exists based on the user ID provided in the request.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns The Express response object or void.
 */
export async function validateUserExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  next();
}
