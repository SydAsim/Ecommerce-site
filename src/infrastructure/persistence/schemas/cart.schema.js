import mongoose ,{Schema} from "mongoose";

const cartSchema = new Schema ({
    userid:{
        type : Schema.Types.ObjectId,
        ref : "User",
        required: [true , "User Id is required"],
        lowercase : true
    }
},{timestamps:true})

export const Cart = mongoose.model("Cart",cartSchema)