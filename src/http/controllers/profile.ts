import { FastifyRequest, FastifyReply } from 'fastify'

export const profileController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    await request.jwtVerify()

    return reply.status(200).send()
}
