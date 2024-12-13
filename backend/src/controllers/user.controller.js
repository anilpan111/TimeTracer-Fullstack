import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiErrors } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessTokenAndRefreshtoken = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiErrors(500,"Something went wrong while generatin tokens")
    }
}

const registerUser = asyncHandler( async (req,res)=>{
    
    // recieve response from frontend
    const {email,fullName,password}=req.body



    //validate the response fields are empty

    if(
        [email,fullName,password].some( (field) => field?.trim() === "")
    ) {
        throw new ApiErrors(400, "All fields are required");
    }

    


    //check whether user already exists

    const isUserExist = await User.findOne({email })

    if(isUserExist){
        throw new ApiErrors(409,"User Already exists")
    }


    //check for avatar and cover image

    const avatarLoacalPath = req.files?.avatar[0].path;

    

    if(!avatarLoacalPath){
        throw new ApiErrors(400, "Avatar is required")
    }



    //upload avatar and cover image in cloudinary

    const avatar = await uploadOnCloudinary(avatarLoacalPath)

    if(!avatar){
        throw new ApiErrors(400, "Avatar cannot be uploaded")
    }

 
    //create user object and enter data in db

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        email,
        password
    })

    // remove password and refresh token from user object
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check if user is created

    if(!createdUser){
        throw new ApiErrors(500,"Something went wrong while registering")
    }

    //return a response

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered succesfully")
    )


})

const loginUser = asyncHandler( async (req,res) =>{


    //recieve data from frontend request body
    const {email,password} = req.body



    if(!email){
        throw new ApiErrors(400, "User email required ")
    }

    const user= await User.findOne({email})

   

    if(!user){
        throw new ApiErrors(404,"User not found")
    }

    //comparing passwords

    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiErrors(401,"Incorrect password")
    }

    //generating access and refresh tokens
    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshtoken(user._id)

    const loggedInUser = await User.findById(user._id).select(" -password -refreshtoken")

    //for deployment

    // const options = {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //     path: '/'
    // };

    //for developement
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    };


    //returning response to the user or frontend
    return res
    .status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            loggedInUser,
            "User logged in successfully"
        )
    )
})

//logout functionality
const logOutUser = asyncHandler( async(req,res)=>{

    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {
            new: true
        }
    )

    //for deployment

    // const options = {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //     path: '/'
    // };

    //for developement
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    };

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, "User logged out"))
})

// validating user's refresh token with database refresh token

const refreshAccessToken =asyncHandler( async(req,res)=>{

    //get refresh token from front end
    const incomingRefreshToken =req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiErrors(400,"Unauthorized request")
    }

    try {

        //decode the refresh token using jwt
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        //find user from db using token's id
        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiErrors(401,"Invalid refresh token")
        }

        //compare user's token and db token
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiErrors(401,"Refresh token is expired")
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            path: '/'
        };

        //genrate access token and refresh token

        const {accessToken,newRefreshToken} = await generateAccessTokenAndRefreshtoken(user._id)

        //return a response

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken:newRefreshToken
                },
                "Access Token refreshed successfully"
            )
        )

    } catch (error) {
        throw new ApiErrors(400, "Access token error")
    }
})


const getCurrentUser = asyncHandler(async(req,res)=>{

    
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"Current user fetched successfully")
    )
})


export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    getCurrentUser
}