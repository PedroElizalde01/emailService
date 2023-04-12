import { Request } from "express";
import { LoginResponseDto } from "../models/dto/login.dto";
import { User } from "../models/entities/user.entity";
import { UserTokenDTO } from "models/dto/token.dto";

const jwt = require('jsonwebtoken');
const secretkey = process.env.TOKEN_SECRET

export const generateToken = async (userToken:UserTokenDTO) : Promise<LoginResponseDto> => {
    return jwt.sign(userToken, secretkey/* , {expiresIn:"1h"} */)
}

export const verifyToken = async (token: string) => {
    return jwt.verify(token, secretkey)
}

export const decodeToken = async (token: string) : Promise<any> => {
    return jwt.decode(token)
}

export const getTokenUser = async (req: Request) : Promise<User> => {
    return (await decodeToken(req.headers.authorization.split(" ")[1]))
}

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.user = user // when calling console.log(req.user), throws error
        res.locals.id = user.id
        next()
    })
}

export const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(402)
        if (user.role !== 'ADMIN') return res.sendStatus(403)
        req.user = user
        next()
    })
}