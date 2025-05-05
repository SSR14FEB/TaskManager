import jwt from "jsonwebtoken";
import {User} from "../models/user_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";

const authentication = asyncHandler((req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization").replace("Bearer", "");
    if (!token) {
        throw new apiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = User.findById(decodeToken._id).select(
        "-password, -refreshToken"
    );
    req.user;
    next();
});

const roleAuthentication = asyncHandler((req, res, next) => {
    if (!req.user && req.user._id == "admin") {
        throw new apiError(403, "Access denied, Admin only");
    }
    next();
});

export { authentication, roleAuthentication };
