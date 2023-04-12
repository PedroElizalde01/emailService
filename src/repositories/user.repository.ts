import { User, UserRole } from '../models/entities/user.entity';
import { prismaErrorHandler } from '../error/prismaErrorHandler';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserRepository {
    
    //register
    async registerUser ({email, name, password, role}: {email: string, name: string, password: string, role:UserRole}): Promise<User> {
        let user;
        try {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password,
                    role,
                },
            });
        } catch (e) {
            prismaErrorHandler(e);
        }
        return user;
    }

    //get user by email
    async userByEmail ({email}: {email: string}): Promise<User> {
        let user;
        try {
            user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
        } catch (e) {
            console.log(e);
        }
        return user;
    }

    //get user by id
    async userById (fromId: string): Promise<User> {
        let user;
        try {
            user = await prisma.user.findUnique({
                where: {
                    id:fromId,
                }
            });
        } catch (e) {
            console.log(e);
        }
        return user;
    }

    //edit user
    async editUser({id, name, password}: {id: string, name: string, password: string}): Promise<User> {
        let user;
        try {
            user = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                    password,
                },
            });
        } catch (e) {
            console.log(e);
        }
        return user;
    }
}