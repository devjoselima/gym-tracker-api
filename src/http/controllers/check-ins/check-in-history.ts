import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export const checkInHistoryController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchUseCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUseCheckInsHistoryUseCase.execute({
        userId: request.user.sub,
        page,
    })

    return reply.status(200).send({
        checkIns,
    })
}
