import { FastifyInstance } from 'fastify'
import { createUserController } from './controllers/create-user'

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', createUserController)
}
