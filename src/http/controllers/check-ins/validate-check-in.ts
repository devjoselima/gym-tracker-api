import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export const validateCheckInController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const validateCheckInParamsSchema = z.object({
        checkInID: z.string().uuid(),
    })

    const { checkInID } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
        checkInID,
    })

    return reply.status(204).send()
}
