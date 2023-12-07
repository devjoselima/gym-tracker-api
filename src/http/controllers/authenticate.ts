import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import {
    PrismaCreateUsersRepository,
    PrismaGetUserByEmailRepository,
} from '@/repositories/prisma/users/'

import { AuthenticateUseCase } from '@/use-cases'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

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
        const prismaGetUserByEmail = new PrismaGetUserByEmailRepository()

        const authenticateUseCase = new AuthenticateUseCase(
            prismaGetUserByEmail
        )

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
