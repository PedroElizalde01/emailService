import express from "express";
import { InternalServerError } from '../error/errors'
import { AdminRepository } from "../repositories/admin.repository";
import { AdminService } from "../service/admin.service";

const router = express.Router();

const adminService: AdminService = new AdminService(new AdminRepository)

//get all users
router.get('/all', async (req, res) =>{``
    res.json(await adminService.getAllUsers(req))
});

//stats
router.get('/stats', async (req, res) => {
    try{
        res.json(await adminService.getStats(req))
    }catch(e){
        console.log(e)
        throw new InternalServerError()
    }
})

//logical delete user
router.put('/delete', async (req, res) => {
try{
    res.json(await adminService.deleteUserService(req))
}catch(e){
    console.log(e)
    throw new InternalServerError()
}
})
export {router as AdminRouter}