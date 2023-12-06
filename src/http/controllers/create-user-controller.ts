import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

    const password_hash = await hash(password, 6)

    const emailAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (emailAlreadyExists) {
        return reply.status(409).send()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    })

    return reply.status(201).send()
}
