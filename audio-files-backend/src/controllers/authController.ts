import { Request, Response } from "express";
import { User } from "../models/userModel";

export async function login(req: Request, res: Response): Promise<Response> {
  console.log("/auth/login", req);
  const user = req.user as User;

  return res.status(200).send({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    isAdmin: user.isAdmin,
  });
}

export async function logout(req: Request, res: Response): Promise<Response> {
  console.log("/auth/logout", req);

  if (!req.user) return res.status(403).send({ error: "Access Denied" });

  req.logout((err) => {
    if (err) return res.sendStatus(400);
  });

  return res.sendStatus(200);
}

export async function status(req: Request, res: Response): Promise<Response> {
  console.log("/auth/status", req);

  const user = req.user as User;

  if (user)
    return res.status(200).send({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
    });

  return res.sendStatus(401);
}
