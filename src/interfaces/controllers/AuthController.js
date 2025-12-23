import { RegisterUser } from "../../application/useCases/auth/RegisterUser.js";
import { asyncHandler } from "../../infrastructure/utils/asyncHandler.js"
import { ApiResponse } from "../../infrastructure/utils/ApiResponse.js"

const registerUserUseCase = new RegisterUser()

export const registerUser = asyncHandler(async (req, res) => {
    const {name , email , password} = req.body;
    const avatarFile = req.files?.avatar?.[0] || null ;

    const user = await registerUserUseCase.execute({
        name ,
        email ,
        password ,
        avatarFile,
        
    })

    return res
    .status(201)
    .json( new ApiResponse (201 ,user, "User registered Successfully" ))
})