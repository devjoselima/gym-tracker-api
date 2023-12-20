import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export const checkInMetricsController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await getUserMetricsUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        checkInsCount,
    })
}
