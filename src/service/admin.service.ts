import { getTokenUser } from "../utils/jwt";
import { AdminRepository } from "../repositories/admin.repository";
import { UserRole } from "../models/entities/user.entity";
import { Request } from "express";
import { UnauthorizedError } from "../error/errors";

export class AdminService {
    constructor(private readonly adminRepository : AdminRepository) {}

    async getAllUsers(req: Request) {
        const tokenUser = await getTokenUser(req)
        console.log(tokenUser)
        if (tokenUser.role !== UserRole.ADMIN) throw new UnauthorizedError("You are not an admin")
        return await this.adminRepository.getAllUsers()
    }

    async getStats(req:Request){
        const tokenUser = await getTokenUser(req)
        if(tokenUser.role !== UserRole.ADMIN) throw new UnauthorizedError("You are not an admin")
        const stats = await this.adminRepository.getStatsUser()
        return stats
    }

    //logical delete user
    async deleteUserService(req: Request) { //when delete, i dont remove data, so a new user with same email wont be created
        const tokenUser = await getTokenUser(req)
        
        if (tokenUser.role !== UserRole.ADMIN) throw new UnauthorizedError("You are not an admin")
        return await this.adminRepository.deleteUser({email: req.body.email})
}
}