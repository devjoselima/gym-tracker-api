import { FastifyInstance } from 'fastify'
import {
    createUserController,
    authenticateController,
    profileController,
} from './'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export const usersRoutes = async (app: FastifyInstance) => {
    app.post('/users', createUserController)
    app.post('/sessions', authenticateController)

    // Authenticated
    app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
