import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createUser, findUserByEmail } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET;

export async function addUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: `This email is already registered.` });
    }

    const secretPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      email,
      password: secretPassword,
    };

    const { id } = await createUser(newUser);

    res.status(201).json({
      message: "User created",
      user: { id, email },
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not create user",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id, email },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
}
