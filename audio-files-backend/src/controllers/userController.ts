import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/password";
import { UserModel } from "../mongoose/schemas/user";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const users = (await UserModel.find().select("username").lean()).map(
    (user) => ({
      id: user._id,
      username: user.username,
    })
  );

  return res.status(200).send(users);
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });

  return res.status(200).send({
    id: user._id,
    username: user.username,
    displayName: user.displayName,
  });
}

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
    const newUserData = (await newUser.save()).toObject();
    return res.status(201).send({
      id: newUserData._id,
      username: newUserData.username,
      displayName: newUserData.displayName,
    });
  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Failed to create user" }] });
  }
}

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);

  if (data.password) {
    data.password = hashPassword(data.password);
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    return res.status(200).send({
      id: updatedUser?._id,
      username: updatedUser?.username,
      displayName: updatedUser?.displayName,
    });
  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Failed to update user" }] });
  }
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Failed to delete user" }] });
  }
}
