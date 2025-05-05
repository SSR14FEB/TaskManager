import { mongoose, Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        profileImageUrl: {
            type: String,
            required: true,
            default: null,
        },
        role: {
            type: String,
            enum: ["admin", "member"],
            default: "member",
        },
        password: {
            type: String,
            unique: true,
            required: true,
            default: null,
        },
        accessToken:{
            type:String,
        },
        refreshToken:{
            type:String,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {
            _Id: this._Id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _Id: this._Id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export  const User = mongoose.model("User", userSchema);
