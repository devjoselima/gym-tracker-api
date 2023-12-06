import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
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

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    })
}
