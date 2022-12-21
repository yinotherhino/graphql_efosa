import typeDefs from "./typedefs/typedefs"
import resolvers from "./resolvers/usersResolver";
import { ApolloServer } from "apollo-server";

import {port, uri} from "./config"
import mongoose from "mongoose";
import { context } from "./context";

mongoose.set('strictQuery', false);
mongoose.connect(uri, ()=>{
    console.log("Database connected")
});

// const server = new ApolloServer({
//     typeDefs, resolvers,cors:true, context
// });

const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen( port, ()=> {
    console.log(`Server started on port ${port}`);
} )

