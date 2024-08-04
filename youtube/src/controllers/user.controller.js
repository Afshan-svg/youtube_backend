import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // algorithm
    // get user details from frontend
    // we have on models file
    // validation - eg: not empty
    // check if user already exists: username || email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object, since mongodb nosql we use objects: create in db
    // remove password and refresh token from response
    // check for user creation: null or response
    // return response
     
    const { fullName, email, username, password } = req.body
    // destructure the things i'll get from body
    console.log("email: ", email);

    if ([fullName, email, username, password].some((field) => field?.trim() ==="")) {
        throw new ApiError(400, "All fields are required")
    }
    if (!email || !email.includes('@')) {
        throw new ApiError(400, "Invalid email format");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //corner cases
        email,
        password,
        username: username.toLowerCase()
    })

    const createsUser = await User.findById(user._id).select(
        "-password -refreshToken" //weird syntax as we add what is not needed with - and " "
    )
    if (!createsUser) {
        throw new ApiError(500, "Something went wrong when registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createsUser, "User registered successfully")
    )
})

export { registerUser }