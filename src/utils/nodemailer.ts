const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:""/* env("NODEMAILER_USER") */,
        pass:""/* env("NODEMAILER_PASS") */
    }
});

export const sendMail = async (message:Message ) => {

}

interface Message{
    from:string,
    to:string,
    subject:string,
    text:string,
}