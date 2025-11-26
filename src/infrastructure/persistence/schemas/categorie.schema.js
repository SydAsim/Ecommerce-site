import mongoose,{Schema} from "mongoose";

const categorieSchema = new Schema ({
    productid:{
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true , "productid is required"],

    },

    name : {
     type: String ,
     required : [true , "Name is required"],
     trim : true
    },
    
    
    description : {
     type: String ,
     required : [true , "Dscription is required"],
     trim : true
    },

    image : {
        type : String,
        required : [true  , "image is required"]
    }
    
},{timestamps :true})

export const Categorie = mongoose.model("Categorie" , categorieSchema)