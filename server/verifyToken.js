import {errorhandler} from './middlewares/error.js'
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorhandler(401, "You are not authenticated!"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(errorhandler(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};