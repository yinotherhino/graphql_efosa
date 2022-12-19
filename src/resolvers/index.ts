import usersResolver from "./resolvers/users";


export default{
    Query:{
        ...usersResolver.Query
    },
    Mutation:{
        ...usersResolver.Mutation

    }
}