import { Request, Response, NextFunction } from "express";
import { User } from "../mongoose/schemas/user";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  if (!user || !user.isAdmin) return res.sendStatus(401);
  next();
}
