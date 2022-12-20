import usersModel from "../models/UsersSchema";
import { CreateUser } from "./typings";
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
        }

    },
    Mutation:{
        CreateUser: async( _:unknown, args:CreateUser )=>{
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
    //     UpdateUser(input:updateUser!):userReturn!
    //     DeleteUserById(id:String!):noDataReturn!
    //     DeleteUserByEmail(email:String!):noDataReturn!

    }
}

export default UserResolver;
