import { StatsResponseDto } from "../models/dto/stats-response.dto";
import { AdminRepository } from "../repositories/admin.repository";
import { UserDTO } from "../models/dto/user.dto";

export class AdminService {
    constructor(private readonly adminRepository : AdminRepository) {}

    async getStats(): Promise<StatsResponseDto[]>{
        const stats = await this.adminRepository.getStatsUser()
        return stats
    }

    async getAllUsers() : Promise<UserDTO[]>{ // parameters?
        return await this.adminRepository.getAllUsers()
    }

    //logical delete user
    async deleteUserService(emailToDelete:string): Promise<UserDTO> { //when delete, i dont remove data, so a new user with same email wont be created
        return await this.adminRepository.deleteUser({email: emailToDelete})
    }
}