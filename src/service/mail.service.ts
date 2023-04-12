import { MailRepository } from '../repositories/mail.repository'
import { UserRepository } from '../repositories/user.repository'
import { UnauthorizedError} from '../error/errors';
import { MailFormDTO, MailResponseDTO } from '../models/dto/mail.dto';

export class MailService{
    constructor(
        private readonly mailRepository: MailRepository,
        private readonly userRepository: UserRepository
    ) {}

    async sendMail(mailForm:MailFormDTO) : Promise<MailFormDTO>{
        const mailsSentToday = await this.mailRepository.getQuantitySentToday(mailForm.fromId)
        if(mailsSentToday >= 1000) throw new UnauthorizedError("You have reached the limit of mails sent today")
        const reciever = await this.userRepository.userByEmail({email: mailForm.to})
        return await this.mailRepository.sendMail({fromId: mailForm.fromId, to: reciever.id, subject: mailForm.subject, body: mailForm.body})
    }

    async getMailsReceived(id:string): Promise<MailResponseDTO[]>{
        return await this.mailRepository.getReceived(id)
    }

    async getMailsSent(id:string): Promise<MailResponseDTO[]>{
        return await this.mailRepository.getSent(id)
    }
}
