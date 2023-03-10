import {gql} from 'apollo-server'

const typeDefs = gql`
    type User{
        _id:ID!
        email:String!
        username:String!
        password:String!
        salt:String
        role:String
    }

    type success  {
        message: String!
        statusCode: Int!
    }

    input createUser{
        email:String!
        username:String!
        password:String!
        role:String
    }

    input updateUser{
        email:String
        username:String
        password:String
        role:String
    }

    input updateUserByEmail{
        email:String!
        _id:String
        username:String
        password:String
        role:String
    }

    input updateUserById{
        _id:String!
        email:String
        username:String
        password:String
        role:String
    }

    type usersSuccess {
        users:[User]!
        message: String!
        statusCode:Int!
    }


    type userSuccess  {
        user: User!
        message: String!
        statusCode: Int!
    }

    type failure  {
        Error: String!
        statusCode: Int!
    }

    
    union userReturn = failure | userSuccess
    union usersReturn = failure | usersSuccess
    union noDataReturn = failure | success

    type Query{
        AllUsers: usersReturn
        SingleUserById(_id:String!): userReturn!
        SingleUserByEmail(email:String!): userReturn!
    }
    type Mutation{
        CreateUser(input:createUser!):userReturn!
        UpdateUser(input:updateUser!):userReturn!
        DeleteUserById(id:String!):noDataReturn!
        DeleteUserByEmail(email:String!):noDataReturn!
    }
`

export default typeDefs 