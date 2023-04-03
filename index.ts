import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express';
import { Request, Response } from 'express';

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.post('/signup', async(req: Request, res: Response) => {
    const {email, name, password} = req.body
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password, // TODO: Hash password ARGON2
        },
    });
    res.json(user)
})

app.get('/users', async(req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users)
})

app.post ('/login', async(req: Request, res: Response) => { // JWT Authorization --> https://www.youtube.com/watch?v=7nafaH9SddU
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user && user.password === password) {
        res.json(user)
    } else {
        res.status(401).json({message: 'Invalid credentials'})
    }
})


const server = app.listen(3000, () =>
  console.log(`Server ready at: http://localhost:3000`),
)