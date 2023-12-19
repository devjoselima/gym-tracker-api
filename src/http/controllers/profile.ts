import { FastifyRequest, FastifyReply } from 'fastify'

export const profileController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    return reply.status(200).send()
}
