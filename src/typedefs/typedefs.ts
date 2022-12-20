import {gql} from 'apollo-server'

export default gql`
    type User{
        _id:ID!
        email:String!
        username:String!
        password:String!
        salt:String
        role:String
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
    

    union userReturn = failure | userSuccess
    union usersReturn = failure | [userSuccess!]
    union noDataReturn = failure | success

    type Query{
        AllUsers: [userReturn]!
        SingleUserById(id:String!): userReturn!
        SingleUserByEmail(email:String!): userReturn!
    }
    type Mutation{
        CreateUser(input:createUser!):userReturn!
        UpdateUser(input:updateUser!):userReturn!
        DeleteUserById(id:String!):noDataReturn!
        DeleteUserByEmail(email:String!):noDataReturn!
    }
`

