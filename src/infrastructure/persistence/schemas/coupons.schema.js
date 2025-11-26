import mongoose,{Schema} from "mongoose";


const couponSchema = new Schema({
    code : {
        type : String,
        required : [true ,"code is required"],
    },

    discount : { 
        type : String,
        required : [true , "Discount is Rquired"],
    },

    expiry : { 
        type : Number, 
        required : [true , "Expiry is Rquired"]
    },

    minamount : {
        type : Number,
        required : [true , "minamount  is Rquired"]
    },
    
    maxuses :{
        type : Number,
        required : [true , "maxuses is Rquired"],
        default : 0
    },

    usedby :  {
        type : Schema.Types.ObjectId,
        ref : "User",
        enum: ["customer", "admin"], //only these values are allowedenum is your security guard + typo protector for roles, statuses, payment methods, etc.
       default: "customer",

    },



},{timeseries : true} ,{timestamps : true})

export const Coupon = mongoose.model("Coupon" , couponSchema)