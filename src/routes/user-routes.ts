import express from "express";

import { UserService } from "../services";

import { validateUser } from "./../middlewares";

const router = express.Router();

router.get("/", UserService.getAllUsers);

router.get("/:id", UserService.getUserByID);

router.post("/", UserService.createNewUser);

router.put("/:id", validateUser, UserService.editUserByID);

router.delete("/:id", UserService.deleteUserByID);

export default router;
