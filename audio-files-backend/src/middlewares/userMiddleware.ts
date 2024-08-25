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
 * Middleware function that checks if the user is an admin or the same as the user in the request parameters.
 * If the user is not the same, it sends a 401 status code.
 * Otherwise, it calls the next middleware function.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns The Express response object or void.
 */
export async function requireCurrentUserOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const user = req.user as User;
  let paramUser;
  try {
    paramUser = await UserModel.findById(req.params.id);
  } catch (err) {
    return res.status(404).send({ error: "User not found" });
  }

  console.log(user.id.toString());
  console.log(paramUser?.id.toString());
  if (
    !user ||
    (paramUser?.id.toString() !== user.id.toString() && !user.isAdmin)
  )
    return res.sendStatus(401);
  next();
}
