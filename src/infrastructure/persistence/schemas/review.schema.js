import mongoose ,{Schema} from "mongoose";

const reviewSchema = new Schema ({
    userid : { 
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true , "Userid is required"],
    },

    rating  : {
        type : Number,
        required : [true , "Rating is requited"],
    },

    comment :{
        type : String
    },


    productid : {
        type :Schema.Types.ObjectId,
        ref : "Product"
    }
},{timestamps : true})

export const Review = mongoose.model("Review" , reviewSchema)