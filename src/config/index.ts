import {config} from "dotenv"

config();

export const port = process.env.PORT!

export const accessSecret = process.env.SECRET!

export const uri = process.env.URI!