import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/password";
import { UserModel } from "../models/userModel";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const users = await UserModel.find().lean();
    console.log("Get Users Called");
    return res.status(200).send(
      users.map((user) => ({
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        isAdmin: user.isAdmin,
      }))
    );
  } catch (err) {
    return res.status(400).send({ error: "Failed to retrieve users" });
  }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    if (!user) return res.status(404).send({ error: "User not found" });

    return res.status(200).send({
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ error: "User not found" });
  }
}

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

  const data = matchedData(req);
  data.password = hashPassword(data.password);

  try {
    const existingUser = await UserModel.findOne({ username: data.username });
    if (existingUser) {
      return res.status(400).send({ error: "Username already taken" });
    }

    const newUser = new UserModel(data);
    const newUserData = await newUser.save();
    return res.status(201).send({
      id: newUserData._id,
      username: newUserData.username,
      displayName: newUserData.displayName,
      isAdmin: newUserData.isAdmin,
    });
  } catch (err) {
    return res.status(400).send({ error: "Failed to create user" });
  }
}

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

  const data = matchedData(req);
  if (data.password) {
    data.password = hashPassword(data.password);
  } else {
    delete data.password;
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).lean();
    return res.status(200).send({
      id: updatedUser?._id,
      username: updatedUser?.username,
      displayName: updatedUser?.displayName,
      isAdmin: updatedUser?.isAdmin,
    });
  } catch (err) {
    return res.status(400).send({ error: "Failed to update user" });
  }
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    console.log("User deleted");
    return res.status(204).send();
  } catch (err) {
    return res.status(400).send({ error: "Failed to delete user" });
  }
}
