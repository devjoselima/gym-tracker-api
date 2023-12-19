import { FastifyInstance } from 'fastify'
import {
    createUserController,
    authenticateController,
    profileController,
} from './controllers/'

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', createUserController)
    app.post('/sessions', authenticateController)

    // Authenticated
    app.get('/me', profileController)
}
