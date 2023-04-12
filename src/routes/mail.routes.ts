import express from 'express';
import { BadRequestError, InternalServerError } from '../error/errors'
import { MailRepository } from '../repositories/mail.repository';
import { UserRepository } from '../repositories/user.repository';
import { MailService } from '../service/mail.service';

const router = express.Router();

const mailService: MailService = new MailService(new MailRepository, new UserRepository)

//sendMail
router.post('/send', async(req, res) => {
    try {
        if(!req.body.to || !req.body.subject || !req.body.body)
            throw new BadRequestError('Missing parameters')
        res.status(201).json(await mailService.sendMail(req))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

//getMailsReceived
router.get('/received', async(req, res) => {
    try {
        res.status(201).json(await mailService.getMailsReceived(req))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

//getMailsSent
router.get('/send', async(req, res) => {
    try {
        res.status(201).json(await mailService.getMailsSent(req))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

//logical delete mail
router.put('/delete', async(req, res) => {
    try {
        res.status(201).json(await mailService.deleteMail(req))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});
export { router as MailRouter }