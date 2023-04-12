import { getTokenUser } from '../utils/jwt'
import { MailRepository } from '../repositories/mail.repository'
import { UserRepository } from '../repositories/user.repository'
import { Request } from 'express'
import { UnauthorizedError} from '../error/errors';

export class MailService{
    constructor(
        private readonly mailRepository: MailRepository,
        private readonly userRepository: UserRepository) {}

    async sendMail(req:Request){
        const tokenUser = await getTokenUser(req)
        const mailsSentToday = await this.mailRepository.getQuantitySentToday(tokenUser.id)
        console.log(mailsSentToday)
        if(mailsSentToday >= 1000) throw new UnauthorizedError("You have reached the limit of mails sent today")
        const reciever = await this.userRepository.userByEmail({email: req.body.to})
        return await this.mailRepository.sendMail({fromId: tokenUser.id, to: reciever.id, subject: req.body.subject, body: req.body.body})
    }

    async getMailsReceived(req: Request){
        const tokenUser = await getTokenUser(req)
        return await this.mailRepository.getReceived(tokenUser.id)
    }

    async getMailsSent(req: Request){
        const tokenUser = await getTokenUser(req)
        return await this.mailRepository.getSent(tokenUser.id)
    }

    async deleteMail(req: Request){
        const tokenUser = await getTokenUser(req)
        //if (tokenUser.role !== UserRole.ADMIN) throw new UnauthorizedError("You are not an admin")
        
        return await this.mailRepository.deleteMail({id: req.body.id})
    }
}
