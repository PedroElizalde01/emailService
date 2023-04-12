import { PrismaClient } from '@prisma/client'
import { User } from '../models/entities/user.entity';
import { StatsResponseDto } from '../models/dto/stats-response.dto';

const prisma = new PrismaClient();

export class AdminRepository{

    //get all users
    async getAllUsers(): Promise<any>{
        return await prisma.user.findMany({
            where: {
                deleteAt: null,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
    }   
    
    //logic delete user
    async deleteUser({email}:{email:string}): Promise<User>{
        let user;
        try {
            user = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    deleteAt: new Date(),
                },
            });
        } catch (e) {
            console.log(e);
        }
        return user;
    }

    //stats
    async getStatsUser(): Promise<StatsResponseDto[]> {
        const today = new Date();
        today.setHours(0,0,0,0);

        const users = await prisma.user.findMany({
            where: {
                mails: {
                    some: {
                        createdAt: {
                            gte: today
                        }
                    }
                }
            },
            select: {
                name: true,
                email:true,
                mails: {
                    where: {
                        createdAt: {
                            gte: today
                        },
                    },
                    select: {
                        id: true,
                    },
                },
            },
        })
        console.log(users)

        return users.map(user => {
            return {
                name: user.name,
                email: user.email,
                mailsSentToday: user.mails.length,
            }
        })        
    }
}