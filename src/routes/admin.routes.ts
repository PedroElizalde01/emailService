import express from "express";
import { InternalServerError } from '../error/errors'
import { AdminRepository } from "../repositories/admin.repository";
import { AdminService } from "../service/admin.service";
import { authenticateAdmin } from "../utils/jwt";

const router = express.Router();

const adminService: AdminService = new AdminService(new AdminRepository)

//stats
router.get('/stats', authenticateAdmin, async (req, res) => {
    try{
        res.status(200).json(await adminService.getStats())
    }catch(e){
        console.log(e)
        throw new InternalServerError()
    }
})

//get all users
router.get('/all', authenticateAdmin, async (req, res) =>{//add parameters
    res.status(200).json(await adminService.getAllUsers())
});

//logical delete user
router.put('/delete', authenticateAdmin, async (req, res) => {
    try{
        res.status(200).json(await adminService.deleteUserService(req.body.email))
    }catch(e){
        console.log(e)
        throw new InternalServerError()
    }
})

export {router as AdminRouter}