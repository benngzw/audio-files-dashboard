import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/password";
import { UserModel } from "../mongoose/schemas/user";

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
