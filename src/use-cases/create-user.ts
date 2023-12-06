import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface CreateUserUseCaseParams {
    name: string
    email: string
    password: string
}

export const createUserUseCase = async ({
    name,
    email,
    password,
}: CreateUserUseCaseParams) => {
    const password_hash = await hash(password, 6)

    const emailAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (emailAlreadyExists) {
        throw new Error('Email already exists.')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    })
}
