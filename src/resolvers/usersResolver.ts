import usersModel from "../models/UsersSchema";
import { CreateUser, UpdateUser } from "./typings";
import bcrypt, { genSalt } from 'bcrypt';

const UserResolver = {
    userReturn: {
        __resolveType: (obj:any) => {
            if(obj.user){
                return "userSuccess"
            }
            if(obj.Error){
                return "failure"
            }
            return null
        }
    },
    Query:{
        AllUsers: async( _:unknown, args:unknown, context:any )=>{
            try{
                const users = await usersModel.find({});
                if(users){
                    return users;
                }
                return {statusCode:404, Error:"No users found."}
  
        }
        catch(err){
            return {statusCode:500, Error:"Something went wrong."}
        }
        },
        SingleUserById: async( _:unknown, args:{_id:string}, context:any ) => {
        try{
            const user = await usersModel.findOne({_id:args._id});
            if(user){
                return {user, statusCode:200, message:"Operation successful."};
            }
            return {statusCode:404, Error:"User not found."}
        }
        catch(err){
            return {statusCode:500, Error:"Something went wrong."}
        }
        },
        SingleUserByEmail: async( _:unknown, args:{email:string}, context:any ) => {
        try{
            const user = await usersModel.findOne({email:args.email});
            if(user){
                return {user, statusCode:200, message:"Operation successful."};
            }
            return {statusCode:404, Error:"User not found."}
        }
        catch(err){
            return {statusCode:500, Error:"Something went wrong."}
        }
        }

    },
    Mutation:{
        CreateUser: async( _:unknown, args:CreateUser, context:any  )=>{
            try {
                const salt = await genSalt();
                const {email,role,username} = args.input
                const password = await bcrypt.hash( args.input.password, salt)

                const user = await usersModel.findOne({$or:[{email},{username}]}, {password:0, salt:0});

                const newData = {
                    username,
                    password,
                    email,
                    role,
                    salt,
                }
                
                const newUser = await usersModel.create(newData);
                if(user)
                return {user:newUser, statusCode:201, message:"User Created Successfully"};
            } 
            catch (err) {
                return {statusCode:500, Error:"Something went wrong."}
            }
        },
        UpdateUser: async( _:unknown, args:UpdateUser, context:any )=>{
            try {
                const salt = await genSalt();
                const {email,role,username} = args.input
                const password = args.input.password ? await bcrypt.hash( args.input.password, salt) : undefined
                
                const user = await usersModel.findOne({_id});
                if(user){
                    const updatedUser = await usersModel.updateOne({_id}, {email, role, username, password});
                    return (updatedUser ? {user:updatedUser, statusCode:200, message:"User Updated Successfully"} : {statusCode:401, Error:"Error updating user."})
                }
                return {statusCode:404, Error:"User not found."}
            }
            catch (err) {
                return {statusCode:500, Error:"Something went wrong."}
            }
        },
        DeleteUserById: async( _:unknown, args:deleteUser, context:any )=>{
            try {
                const salt = await genSalt();
                // const _id = args._id
                const {email,role,username} = args.input
                const password = args.input.password ? await bcrypt.hash( args.input.password, salt) : undefined
                
                const user = await usersModel.findOne({_id});
                if(user){
                    const deletedUser = await usersModel.deleteOne({_id}, {email, role, username, password});
                    return (deletedUser ? {user:deletedUser, statusCode:204, message:"User Updated Successfully"} : {statusCode:401, Error:"Error updating user."})
                }
                return {statusCode:404, Error:"User not found."}
            }
            catch (err) {
                return {statusCode:500, Error:"Something went wrong."}
            }
        }
    //     DeleteUserById(id:String!):noDataReturn!
    //     DeleteUserByEmail(email:String!):noDataReturn!

    }
}

export default UserResolver;
