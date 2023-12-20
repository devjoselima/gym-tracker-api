import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createCheckInController } from './create-check-in'

export const checkInsRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/check-ins', createCheckInController)
}
