import {mongoose} from "mongoose"
import { DB_NAME } from "../../constants.js"

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`connection Successful at ${connectionInstance.connection.host}`); // .connection,host means that at leST I SHould Know where iam connected {production / local / testing env} 
    } catch (error) {
        console.log("DB Connection failed", error)
        process.exit(1)
    }
}

export default connectDB





