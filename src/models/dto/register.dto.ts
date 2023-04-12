import { UserRole } from "models/entities/user.entity";

export interface RegisterFormDTO {
    email:string,
    name:string,
    password:string,
    role: UserRole
}

export interface RegisterResponseDTO {
    id:string,
    email:string,
    name:string,
    password:string,
    role: UserRole
}