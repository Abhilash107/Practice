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
    }
}, {timestamps: true})


export const User = mongoose.model("User" , userSchema)