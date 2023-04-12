import express from 'express';
import { BadRequestError, InternalServerError } from '../error/errors'
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../service/user.service';
import { checkEmail } from '../utils/regex';
import { getTokenUser, authenticateToken } from '../utils/jwt';

const router = express.Router();

const userService: UserService = new UserService(new UserRepository)

router.post('/register', async(req, res) => {
    try {
        if(!req.body.email || !req.body.name || !req.body.password) {
            throw new BadRequestError("Missing fields")
        }
        if(!checkEmail(req.body.email)) res.status(400).json({message: "Invalid email"})
        res.status(201).json(await userService.registerUser(req.body))
    }
    catch(e) {
        console.log(e)
        // throw new InternalServerError()
        res.status(500).json({message: "Internal server error"})
    }
    
});

router.post('/login', async(req, res)=> {
    try {
        if(!req.body.email || !req.body.password) {
            throw new BadRequestError("Missing fields")
        }
        res.status(201).json(await userService.loginUser({email:req.body.email, password:req.body.password}))
    } catch(e) {
        console.log(e)
        // throw new InternalServerError()
        res.status(500).json({message: "Internal server error"})    }
})

router.get('/me',authenticateToken, async (req, res) => {
    try{
        res.status(200).json(await getTokenUser(req))
    }catch(e){
        console.log(e)
        // throw new InternalServerError()
        res.status(500).json({message: "Internal server error"})    }
})

router.put('/edit',authenticateToken, async (req, res) => {
    try{
        const tokenUser = await getTokenUser(req)
        res.status(200).json(await userService.editMe(tokenUser.id, {name: req.body.name, password: req.body.password}))
    }catch(e){
        console.log(e)
        // throw new InternalServerError()
        res.status(500).json({message: "Internal server error"})    }
})

export { router as UserRouter }