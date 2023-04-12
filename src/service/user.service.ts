import { UserRepository } from '../repositories/user.repository';
import { User, UserRole} from '../models/entities/user.entity';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken, decodeToken, getTokenUser } from '../utils/jwt';
import { NotFoundError } from '../error/errors';
import { Request } from 'express';
import { LoginResponseDto } from 'models/dto/login-response.dto';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    //register
    async registerUser(user: User): Promise<User> {
        user.password = await hashPassword(user.password)
        const role = user.role ? user.role : UserRole.USER
        return await this.userRepository.registerUser({email: user.email, name: user.name, password: user.password, role})
    }

//login
 async loginUser(user: User): Promise<LoginResponseDto> {
    const userByEmail = await this.userRepository.userByEmail({email: user.email})
    if(!userByEmail) throw new NotFoundError("User not found")
    const verifiedPassword = await comparePassword(userByEmail.password, user.password)
    if(!verifiedPassword) throw new Error("Incorrect password")
    return await generateToken(userByEmail)
}

//get me
async getMe(req: Request) : Promise<User> {
    return await getTokenUser(req)
}

// edit me
async editMe (req: Request) { // should check if the user is the same as the one in the token?
    const editedUser = req.body
    const tokenUser = await getTokenUser(req)
    editedUser.password = await hashPassword(editedUser.password)
    const newUser = await this.userRepository.editUser({id: tokenUser.id, name: editedUser.name, password: editedUser.password})
    return await generateToken(newUser)
}
}
