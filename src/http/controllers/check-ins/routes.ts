import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import {
    checkInHistoryController,
    checkInMetricsController,
    createCheckInController,
    validateCheckInController,
} from './'

export const checkInsRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', checkInHistoryController)
    app.get('/check-ins/metrics', checkInMetricsController)

    app.post('/gyms/:gymId/check-ins', createCheckInController)
    app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
