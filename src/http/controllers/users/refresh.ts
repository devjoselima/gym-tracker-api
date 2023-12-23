import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const refreshController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    await request.jwtVerify({ onlyCookie: true })

    const refreshBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
            },
        }
    )

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d',
            },
        }
    )

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .status(200)
        .send({
            token,
        })
}
