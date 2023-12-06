import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createUserUseCase } from '@/use-cases/create-user'

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
        await createUserUseCase({
            name,
            email,
            password,
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}
