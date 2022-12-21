import jwt,{ JwtPayload } from "jsonwebtoken";
import { accessSecret } from "../config";

export default async (token:string) => {
    return jwt.verify(token, accessSecret) as JwtPayload
}
