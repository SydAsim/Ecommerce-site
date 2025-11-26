import { json } from "express";
import mongoose , {Schema} from "mongoose";

const orderSchema = new Schema ({
    shippingaddress : {
        type : String,
        required : [true , "Shipping address is Rquired"],

    },

    paymentmethod :{
        type : String,
        required : [true , "Discount is Rquired"]
    },
    paymentresult :{
        type : json,
        
    }
})