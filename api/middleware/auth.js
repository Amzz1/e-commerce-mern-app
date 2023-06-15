// middleware/auth.js
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Access token not found"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Invalid token"));
    }

    req.user = user;
    next();
  });
};

export const checkAdminAccess = (req, res, next) => {
  if (!req.user && req.user.isAdmin !== true) {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this resource." });
  }

  next();
};
