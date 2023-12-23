import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import {
    checkInHistoryController,
    checkInMetricsController,
    createCheckInController,
    validateCheckInController,
} from './'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export const checkInsRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', checkInHistoryController)
    app.get('/check-ins/metrics', checkInMetricsController)

    app.post('/gyms/:gymId/check-ins', createCheckInController)
    app.patch(
        '/check-ins/:checkInId/validate',
        { onRequest: [verifyUserRole('ADMIN')] },
        validateCheckInController
    )
}
