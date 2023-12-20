import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import {
    createGymController,
    nearbyGymsController,
    searchGymsController,
} from './'

export const gymsRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', searchGymsController)
    app.get('/gyms/nearby', nearbyGymsController)

    app.post('/gyms', createGymController)
}
