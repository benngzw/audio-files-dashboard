import { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../mongoose/schemas/user";

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const user = req.user as User;
  if (!user || !user.isAdmin) return res.sendStatus(401);
  next();
}

export async function validateUserExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).send({ msg: "User not found" });
  next();
}
