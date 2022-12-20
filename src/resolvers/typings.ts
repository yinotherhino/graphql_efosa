export interface UserCreate {
    email: string;
    username: string;
    password: string;
    role:string;
}

export interface CreateUser{
    input:UserCreate
}