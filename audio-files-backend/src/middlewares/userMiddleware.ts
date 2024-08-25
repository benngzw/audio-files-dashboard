import { Request, Response, NextFunction } from "express";

import { User, UserModel } from "../models/userModel";
import { AccessDeniedError, UnauthorizedError } from "../errors";

/**
 * Middleware function that checks if the user is an admin.
 * If the user is not an admin, it sends a 403 status code.
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
  if (!user) throw new UnauthorizedError();
  if (!user.isAdmin) throw new AccessDeniedError();
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
  if (!user) throw new UnauthorizedError();
  next();
}

/**
 * Middleware function that checks if the current user is the owner of the resource or an admin.
 * If the user is not authenticated or does not have the necessary permissions, an UnauthorizedError is thrown.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next function to be called in the middleware chain.
 * @returns The Express response object or void.
 */
export function requireCurrentUserOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const user = req.user as User;
  if (!user) throw new UnauthorizedError();
  if (req.params.id !== user.id.toString() && !user.isAdmin)
    throw new AccessDeniedError();
  next();
}
