import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"
import { accessSecret } from "./config";

export const context = async({ req }:any) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    if(!token){
      throw new GraphQLError("you must be logged in to query this schema")
    }
    const user = jwt.verify(token, accessSecret);

     if (!user) throw new GraphQLError("you must be logged in to query this schema", {
       extensions: {
         code: 'UNAUTHENTICATED',
       },
     });
   
    // add the user to the contextValue
    return {
      user,
      }
    };