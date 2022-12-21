import { GraphQLError } from "graphql";
import getUser from "./utils/getUser";

export const context= async ({ req }:any) => {
    // get the user token from the headers
    const token = req.headers.authentication || '';
   
    const user = await getUser(token);
   
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