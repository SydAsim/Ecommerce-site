import jwt from "jsonwebtoken";
import crypto from "crypto"
import {User} from "../../../infrastructure/persistence/schemas/user.schema.js"
import {ApiError} from "../../../infrastructure/utils/ApiError.js"
import {asyncHandler} from "../../../infrastructure/utils/asyncHandler.js"
import { ApiResponse } from "../../../infrastructure/utils/ApiResponse.js";












const generateAccessandRefreshToken  = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave : false})

        return {accessToken , refreshToken}

    } catch (error) {
        throw new ApiError(500 , error?.message ||  "Something Went wrong While generating access and refresh Token")
    }
} 

const loginUser  = asyncHandler(async(req , res)=>{
    const {email , password, name} = req.body
    if(!email && !name){
        throw new ApiError(400 , "Username or email is Required")
    }

    const user = await User.findOne({
        $or : [{name} , {email}]
    })
    
    if(!user){
        throw new ApiError(400 , "name or email does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400 , "Password is Wrong ")
    }

    const {accessToken , refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedInUser  = await User.findById(user._id).select("password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true , // always use Secure in Production
        samesite : 'none', // requires for cross domain cookies
        maxAge : 24 * 60 * 60 * 1000 , // 1 day
        path : '/'
    }

    const refreshOptions = {
        ...options,
        maxAge : 10*24*60 * 60 *1000 // 10 days
    }

    return  res 
    .status(200)
    .cookie("accessToken",accessToken ,options)
    .cookie("refreshToken" , refreshToken ,refreshOptions)
    .json(
        new ApiResponse (200 , {user : loggedInUser ,accessToken ,refreshToken} , "UserLoggedIn SuccessFully")
    )  

})


const loggedOutUser = asyncHandler(async(req , res)=>{
    await findbyIdAndUpdate (
        req.user.id,
        {$unset : {refreshToken : 1}},
        {new : true}
    )

    const options = {
        httpOnly : true ,
        secure : true ,
        samesite : 'none',
        path : '/'
    }

    return res 
    .status(200)
    .clearCookie ("refreshToken",options)
    .clearCookie("accessToken" , options)
    .json(new ApiResponse(200 , {} ,"User Logged Out Successfully"))
})


const refreshAccessToken = asyncHandler(async(req ,res)=>{
    const incomingrefreshToken = req.body?.refreshToken || req.cookies?.refreshToken
    if(!incomingrefreshToken){
        throw new ApiError(400 , "Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingrefreshToken ,Process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken)
        if(!user){
            throw new ApiError(400 , "Invalid RefreshToken")
        }

        if(incomingrefreshToken !== user?.refreshToken){
            throw new ApiError(400 ,"RefreshToken is Expired")
        }

        const options = {
            httpOnly : true ,
            secure : true,
            sameSite : 'none',
            maxAge : 24*60*60*1000  //1 day
        }

        const refreshOptions = {
            ...options ,
            maxAge: 10*24*60*60*1000 // 10days
        }

        const {accessToken , refreshToken : newrefreshToken} = await generateAccessandRefreshToken(user._id)

        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" ,newrefreshToken , refreshOptions)
        .json(
            new ApiResponse(200 ,"accessToken Refreshed")
        )

    } catch (error) {
        throw new ApiError(400 ,error?.message ||  "Unautherized Request")
        
    }
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200 , req.user ,"Current User Fetched Successfully"))


})


export {
    loginUser,
    refreshAccessToken,
    loggedOutUser,
    getCurrentUser
}