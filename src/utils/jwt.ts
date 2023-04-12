import { Request } from "express";
import { LoginResponseDto } from "../models/dto/login-response.dto";
import { User } from "../models/entities/user.entity";

const jwt = require('jsonwebtoken');

export const generateToken = async (user: any) : Promise<LoginResponseDto> => {
    return jwt.sign({user}, 'secretkey'/* , {expiresIn:"1h"} */)
}

export const verifyToken = async (token: string) => {
    return jwt.verify(token, 'secretkey')
}

export const decodeToken = async (token: string) : Promise<any> => {
    return jwt.decode(token)
}

export const getTokenUser = async (req: Request) : Promise<User> => {
    return (await decodeToken(req.headers.authorization.split(" ")[1])).user
}