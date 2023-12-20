import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export const gymsRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)
}
