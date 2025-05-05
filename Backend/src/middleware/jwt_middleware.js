import jwt from "jsonwebtoken";
import User from "../models/user_model";
import { asyncHandler } from "../utils/asyncHandler";
import { apiError } from "../utils/apiError";

const authentication = asyncHandler((req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization").replace("Bearer", "");
    if (!token) {
        throw new apiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = User.findById(decodeToken._Id).select(
        "-password, -refreshToken"
    );
    req.user;
    next();
});

const roleAuthentication = asyncHandler((req, res, next) => {
    if (!req.user && req.user._Id == "admin") {
        throw new apiError(403, "Access denied, Admin only");
    }
    next();
});

export { authentication, roleAuthentication };
