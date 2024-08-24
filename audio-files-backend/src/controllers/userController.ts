import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/password";
import { User, UserModel } from "../mongoose/schemas/user";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);
  data.password = hashPassword(data.password);

  const existingUser = await UserModel.findOne({ username: data.username });
  if (existingUser) {
    return res
      .status(400)
      .send({ errors: [{ msg: "Username already taken" }] });
  }

  const newUser = new UserModel(data);
  try {
    await newUser.save();
    return res.status(201).send();
  } catch (err) {
    return res
      .sendStatus(400)
      .send({ errors: [{ msg: "Failed to create user" }] });
  }
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const users = (await UserModel.find().select("username").lean()).map(
    (user) => ({
      id: user._id,
      username: user.username,
    })
  );

  return res.status(200).send(users);
}
