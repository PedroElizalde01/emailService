import express from 'express';
import { BadRequestError, InternalServerError } from '../error/errors'
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../service/user.service';

const router = express.Router();

const userService: UserService = new UserService(new UserRepository)

//register
router.post('/register', async(req, res) => {
    try {
        if(!req.body.email || !req.body.name || !req.body.password) {
            throw new BadRequestError("Missing fields")
        }
        res.status(201).json(await userService.registerUser(req.body))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
    
});

//login
router.post('/login', async(req, res) => {
    try {
        if(!req.body.email || !req.body.password) {
            throw new BadRequestError("Missing fields")
        }
        res.status(200).json(await userService.loginUser(req.body))
    } catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
})

//get me
router.get('/me', async (req, res) => {
    try{
        res.json(await userService.getMe(req))
    }catch(e){
        console.log(e)
        throw new InternalServerError()
    }
})

// edit me
router.put('/edit', async (req, res) => {
    try{
        res.json(await userService.editMe(req))
    }catch(e){
        console.log(e)
        throw new InternalServerError()
    }
})

export { router as UserRouter }