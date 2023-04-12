import express from 'express';
import { BadRequestError, InternalServerError } from '../error/errors'
import { MailRepository } from '../repositories/mail.repository';
import { UserRepository } from '../repositories/user.repository';
import { MailService } from '../service/mail.service';
import { authenticateToken } from '../utils/jwt';

const router = express.Router();

const mailService: MailService = new MailService(new MailRepository, new UserRepository)

//sendMail
router.post('/send',authenticateToken, async(req, res) => {
    try {
        if(!req.body.to || !req.body.subject || !req.body.body)
            throw new BadRequestError('Missing parameters')
        // console.log(req.user)
        res.status(201).json(await mailService.sendMail({fromId: res.locals.id, to: req.body.to, subject: req.body.subject, body: req.body.body}))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

//getMailsReceived
router.get('/received',authenticateToken, async(req, res) => {
    try {
        res.status(200).json(await mailService.getMailsReceived(res.locals.id))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

//getMailsSent
router.get('/sent',authenticateToken, async(req, res) => {
    try {
        res.status(200).json(await mailService.getMailsSent(res.locals.id))
    }
    catch(e) {
        console.log(e)
        throw new InternalServerError()
    }
});

export { router as MailRouter }