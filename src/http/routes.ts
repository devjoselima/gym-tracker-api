import { FastifyInstance } from 'fastify'
import {
    createUserController,
    authenticateController,
    profileController,
} from './controllers/'
import { verifyJWT } from './middlewares/verify-jwt'

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', createUserController)
    app.post('/sessions', authenticateController)

    // Authenticated
    app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
