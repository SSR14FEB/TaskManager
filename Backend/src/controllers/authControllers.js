import { User } from "../models/user_model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { removeFromCloudinary } from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        user.save({ validationBeforeSave: false });
        return { refreshToken, accessToken };
    } catch (error) {
        throw new apiError(
            500,
            "Something went wrong while generating access token and refresh token"
        );
    }
};

const register = asyncHandler(async (req, res) => {
    // fields
    const { name, email, password, adminCode } = req.body;
    const profileImage = req.file?.path || null;
    if (
        [name, email, profileImage, password].some(
            (field) => field?.trim() == ""
        )
    ) {
        throw new apiError(400, "All fields are required");
    }
    if (password.length < 8) {
        throw new apiError(422, "password format invalid");
    }
    // checking wether user is already existed or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new apiError(409, "User is already existed");
    }
    // image upload on cloud using middle ware
    let localFilePath;
    if (req.file && req.file?.path) {
        localFilePath = profileImage;
    }
    const profilePicture = await uploadOnCloudinary(localFilePath);
    // populating user schema in to database
    const user = await User.create({
        name: name,
        email: email,
        profileImageUrl: profilePicture?.url,
        role: adminCode == process.env.ADMIN_INVITE_TOKEN ? "admin" : "member",
        password: password,
    });
    return res
        .status(201)
        .json(new apiResponse(201, "user created successfully", user));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email || password)) {
        throw new apiError(400, "all fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new apiError(404, "User not found");
    }
    const passwordVerification = await user.isPasswordCorrect(password);
    if (!passwordVerification) {
        throw new apiError(401, "Wrong password for existing user");
    }
    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user);
    const loggedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    const option = {
        httpOnly: true,
        secure: false,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(new apiResponse(200, "User successfully logged in", loggedUser));
});

const logout = asyncHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1,
            },
        },
        { new: true }
    );
    const option = {
        httpOnly: true,
        secure: true,
      };
    return res
        .status(200)
        .clearCookie("accessToken",option)
        .clearCookie("refreshToken",option)
        .json(new apiResponse(200, "User logged out successfully"));
});

const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password, -refreshToken"
    );
    if (!user) {
        throw new apiError(404, "User not found");
    }
    return res
        .status(200)
        .json(new apiResponse(200, "User profile fetched successfully", user));
});

const updateProfile = asyncHandler(async (req, res) => {
    const { name, email, profileImage } = req.body;
    if ([name, email, profileImage].some((fields) => fields?.trim() == "")) {
        throw new apiError(400, "All fields are required");
    }
    const user = await User.findById(req.user._id).select(
        "-role, -password, -refreshToken"
    );
    if (!user) {
        throw new apiError(404, "User not found");
    }

    let newProfileImage = "";
    let localFilePath = "";
    if (
        req.files &&
        Array.isArray(req.files?.profileImage) &&
        req.files?.profileImage.length > 0
    ) {
        localFilePath = req.files?.profileImage[0]?.path;
        newProfileImage = await uploadOnCloudinary(localFilePath);

        const previousProfilePictureUrl = user.profileImageUrl;
        await removeFromCloudinary(previousProfilePictureUrl);
    }

    user.name = name;
    user.email = email;
    user.profileImageUrl = newProfileImage.url || user.profileImageUrl;
    user.save({ validationBeforeSave: false });

    return res
        .status(200)
        .json(new apiResponse(200, "Profile updated successfully"));
});

export { register, login, logout, profile, updateProfile };
