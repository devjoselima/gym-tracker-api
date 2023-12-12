import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/'

export const createUserController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const createUserUseCase = makeCreateUserUseCase()

        await createUserUseCase.execute({
            name,
            email,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message,
            })
        }

        throw error
    }

    return reply.status(201).send()
}
