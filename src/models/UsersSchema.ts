
import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import { accessSecret } from "../config";

export interface UserInstance {
    _id: string;
    email:string;
    password:string;
    username:string;
	salt:string;
    role:string;
}


const usersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
        unique: true
	},
	password: {
		type: String,
		required: true,
	},
    salt: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true
    }
},{timestamps:true});

usersSchema.methods.authToken = function () {
	return jwt.sign({email: this.email, isAdmin:this.isAdmin}, accessSecret, {expiresIn: '3d'}); // eslint-disable-line 
};

const usersModel = mongoose.model<UserInstance>('gqltest', usersSchema);

export default usersModel;
