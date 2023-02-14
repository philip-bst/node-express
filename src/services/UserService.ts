import { RequestHandler } from "express";

import { User } from "schemas";

import { users } from "../data/users";

let staticUsers = users;

export const getAllUsers: RequestHandler = (_req, res) => {
  res.json(staticUsers);
};

export const getUserByID: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const user = staticUsers.find((user) => user.id === Number(id));

  if (!user) {
    res.status(404).json({
      message: `User of id: ${id} was not found`,
    });
  }

  res.status(200).json(user);
};

export const createNewUser: RequestHandler = (req, res) => {
  const body: User = req.body;
  const user: User = { ...body, id: Math.floor(Math.random() * 10) };

  staticUsers.push(user);

  res.json(user);
};

export const editUserByID: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const body: Partial<User> = req.body;

  const user = staticUsers.find((user) => user.id === Number(id));

  if (!user) {
    res.status(404).json({
      message: `User of id: ${id} does not exist`,
    });
  }

  for (let key of Object.keys(body)) {
    // @ts-ignore
    user[key] = body[key as keyof User];
  }

  res.json(user);
};

export const deleteUserByID: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    res.status(404).json({
      message: `User of id: ${id} does not exist`,
    });
  }

  staticUsers = users.filter((user) => user.id !== Number(id));

  res.json({
    message: "User has been deleted",
  });
};
