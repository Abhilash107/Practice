import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,//for searching
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type:String,
        required: true,
        trim: true,
        index: true,//for searching
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
    }
}, {timestamps: true})

//save password in the DB
userSchema.pre("save", async function(next){
    //check if password is modified
    if(!this.isModified("password")){
        return next()
    }
    // if modified, then use hashing to encrypt it
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// check password
userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

//generateAccessToken
//jwt.sign( {payload}, {secret key}, {expiresIn})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 


//generateRefreshToken
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User" , userSchema)