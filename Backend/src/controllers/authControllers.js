import { User } from "../models/user_model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloud from "../utils/cloudinary.js";

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
    const { name, email, profileImage, password, role, adminCode } = req.body;
    if (
        [name, email, profileImage, password, role, adminCode].some(
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
    if (adminCode !== process.env.ADMIN_INVITE_TOKEN) {
        throw new apiError(403, "Invalid admin invite token");
    }
    // image upload on cloud using middle ware
    let localFilePath;
    if (
        req.files &&
        Array.isArray(req.files.profileImage) &&
        req.files?.profileImage.length > 0
    ) {
        localFilePath = req.files?.profileImage[0]?.path;
    }
    const profilePicture = await uploadOnCloud(localFilePath);
    // populating user schema in to database
    const user = await User.create({
        name: name,
        email: email,
        profileImageUrl: profilePicture?.url,
        role: role,
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
   await User.findByIdAndUpdate(req.user._id,{
    $unset:{
        refreshToken:1
    }
   },{new:true})
    return res
        .status(200)
        .json(new apiResponse(200, "User logged out successfully"));
});

const profile = asyncHandler(async (req, res) => {
    const admin = await User.findById(req.user._id).select("-password, -refreshToken")
    if(!admin){
        throw new apiError(404,"Admin not found")
    }
    return res.status(200)
    .json(new apiResponse(200,"User profile fetched successfully",admin))
});

const updateProfile = asyncHandler(async (req, res) => {});

export { register, login, logout, profile, updateProfile };
