import {User} from "../schemas/user.schema.js"
export class UserRepository {

    async findByEmail(email){
        return await User.findOne({email})
    }

    async create (userData){
        const user = await User.create(userData)
        user.password = undefined;
        user.refreshToken = undefined;

        return user;
    }

    // Add more methods find by ID and update etc
    
}