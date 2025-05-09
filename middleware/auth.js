import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js"; 

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied: Authorization header required" });
  }

  const token = authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
