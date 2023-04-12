import {describe, expect, test} from '@jest/globals';
import { decodeToken, verifyToken } from '../src/utils/jwt';
import { UserTokenDTO } from '../src/models/dto/token.dto';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjM2NhZTBiLTk1OWQtNDhmNy04NGNlLWY0Njc4Yzk3OTk1YSIsIm5hbWUiOiJyaWNreSIsImVtYWlsIjoicmlja3lAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgxMzMyMjQ3fQ.MaE81pXMBS3TysvwnicM-Lo7ARgpnMeyMYSAJVfMqu4'

describe('Decode JWT', ()=>{
    test('Test Decoding with JWT library', async () => { 
        const user = await decodeToken(token)
        expect(user).toStrictEqual(expectedUser)
    })
})

describe('Verify JWT', ()=>{
    test('Test Verifing with JWT library', async () => { 
        const user = await verifyToken(token)
        console.log(user)
        // expect(user).toStrictEqual(expectedUser)
    })
})

const expectedUser = {
    id: 'bc3cae0b-959d-48f7-84ce-f4678c97995a',
    name: 'ricky',
    email: 'ricky@gmail.com',
    role: 'ADMIN',
    iat: 1681332247
  }
