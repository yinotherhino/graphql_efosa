import typeDefs from "./typedefs/typedefs"
import resolvers from "./resolvers";
import { ApolloServer } from "apollo-server";
import {port} from "./config"


const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen( port, ()=> {
    console.log(`Server started on port ${port}`);
} )