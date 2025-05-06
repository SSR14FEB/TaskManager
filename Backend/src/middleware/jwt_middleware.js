import jwt from "jsonwebtoken";
import { User } from "../models/user_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";

const authentication = asyncHandler(async (req, _, next) => {
  try {
      console.log(req);
      const token =
          req.cookies?.accessToken ||
          req.header("Authorization").replace("Bearer", "");
      if (!token) {
          throw new apiError(401, "Unauthorized request");
      }
      const decodedToken = await jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET_KEY
      );
      const user = await User.findById(decodedToken._id).select(
          "-password, -refreshToken"
      );
      req.user = user;
      next();
  } catch (error) {
    throw new apiError(401,"unauthorized")
  }
});

const roleAuthentication = asyncHandler((req, res, next) => {
    if (!req.user && req.user.role == "admin") {
        throw new apiError(403, "Access denied, Admin only");
    }
    next();
});

export { authentication, roleAuthentication };
