import express from "express";
import { addUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", addUser);

router.post("/login", loginUser);

export default router;
