import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authetications-use-case'

export const authenticateController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({
            email,
            password,
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: error.message,
            })
        }

        throw error
    }

    return reply.status(200).send()
}
