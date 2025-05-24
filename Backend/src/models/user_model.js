import { mongoose, Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index:true
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
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
   try {
     return jwt.sign(
         {
             _id: this._id,
             email: this.email,
             role: this.role,
         },
         process.env.ACCESS_TOKEN_SECRET_KEY,
         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
     );
   } catch (error) {
    console.log("error while generating access token",error)
   }
};

userSchema.methods.generateRefreshToken = function () {
  try {
      return jwt.sign(
          {
              _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
  } catch (error) {
    console.log("error while generating refresh token",error)
  }
};

export  const User = mongoose.model("User", userSchema);
