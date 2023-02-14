import { RequestHandler } from "express";

import { UserSchema } from "../schemas";

export const validateUser: RequestHandler = (req, res, next) => {
  try {
    const body = req.body;
    UserSchema.partial().strict().parse(body);
    next();
  } catch (error) {
    res.status(400).json(error).end();
  }
};
