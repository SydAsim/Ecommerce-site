import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50,"Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },


    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password by default
    },

    role: {
      type: String,
      enum: ["customer", "admin"], //only these values are allowedenum is your security guard + typo protector for roles, statuses, payment methods, etc.
      default: "customer",
      lowercase: true,
    },

    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=ff6b6b&color=fff&rounded=true&size=128&font-size=0.5&bold=true`;
      },
    },
  
    refreshToken: 
    { type: String, select: false },

    passwordResetToken:
     { type: String, select: false },

    passwordResetExpires: 
    { type: Date, select: false },

  },
  { timestamps: true }
);

// Indexes
// userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Pre-save hook
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password , 12)
 next()
})

// Methods
userSchema.methods.isPasswordCorrect  = async function (password){
   return await bcrypt.compare(password , this.password )
}

userSchema.methods.generateAccessToken = function()
{
  return jwt.sign
  (
    {
      _id: this._id,
      email : this.email,
      role : this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function()
{
  return jwt.sign
  (
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

// this is important and every rest token must be generated on every rest not stored like in the db 
userSchema.methods.generatePasswordResetToken =function (){
  // genrate random Token
  const resetToken  = crypto.randomBytes(32).toString('hex')

  //Hash token and store in db 
  this.passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')

  //set Expiry 
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // return unhashed token to send via Email 
  return  resetToken;
}

export const User = mongoose.model("User" , userSchema)