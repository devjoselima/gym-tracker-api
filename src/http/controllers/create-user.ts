import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { CreateUserUseCase } from '@/use-cases/create-user'
import {
    PrismaCreateUsersRepository,
    PrismaGetUserByEmailRepository,
} from '@/repositories/prisma/users/'

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
        const prismaUsersRepository = new PrismaCreateUsersRepository()
        const prismaGetUserByEmail = new PrismaGetUserByEmailRepository()
        const createUserUseCase = new CreateUserUseCase(
            prismaUsersRepository,
            prismaGetUserByEmail
        )

        await createUserUseCase.execute({
            name,
            email,
            password,
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}
