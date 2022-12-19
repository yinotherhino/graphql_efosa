import {gql} from 'apollo-server'

export default gql`
    type User{
        _id:ID!
        email:String!
        username:String!
        password:String
        fullname:String
        salt:String
    }
`

