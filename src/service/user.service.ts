import { UserRepository } from '../repositories/user.repository';
import { User, UserRole} from '../models/entities/user.entity';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken, getTokenUser } from '../utils/jwt';
import { NotFoundError, UnauthorizedError } from '../error/errors';
import { LoginFormDTO, LoginResponseDto } from '../models/dto/login.dto';
import { RegisterFormDTO, RegisterResponseDTO } from '../models/dto/register.dto';
import { EditFormDTO, EditResponseDTO } from 'models/dto/edit.dto';

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async registerUser(registerForm: RegisterFormDTO): Promise<User> {
        registerForm.password = await hashPassword(registerForm.password)
        const role = registerForm.role ? registerForm.role : UserRole.USER
        return await this.userRepository.registerUser(registerForm)
    }

    async loginUser(loginForm: LoginFormDTO): Promise<LoginResponseDto> {
        const userByEmail = await this.userRepository.userByEmail({email: loginForm.email})
        if(!userByEmail) throw new NotFoundError("User not found")
        const verifiedPassword = await comparePassword(userByEmail.password, loginForm.password)
        if(!verifiedPassword) throw new Error("Incorrect password")
        return await generateToken({id: userByEmail.id, name: userByEmail.name, email: userByEmail.email, role : userByEmail.role})
    }

    // async getMe(token:String) : Promise<User> {
    //     return await getTokenUser(req)
    // }

    async editMe (id:string, editForm: EditFormDTO) : Promise<EditResponseDTO>{ // should check if the user is the same as the one in the token?
        editForm.password = await hashPassword(editForm.password)
        const newUser = await this.userRepository.editUser({id: id, name: editForm.name, password: editForm.password})
        // return await generateToken({id: newUser.id, name: newUser.name, email: newUser.email, role : newUser.role})
        return await {id: newUser.id, name: newUser.name, password : newUser.password}
    }
}
