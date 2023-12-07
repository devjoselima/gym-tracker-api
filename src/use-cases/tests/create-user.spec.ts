import { expect, describe, it } from 'vitest'
import { CreateUserUseCase } from '../create-user'
import { compare } from 'bcryptjs'
import {
    InMemoryCreateUserRepository,
    InMemoryGetUserByEmailRepository,
} from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/errors/user'

describe('Create User Use Case', () => {
    it('should be able to register', async () => {
        const createUserRepository = new InMemoryCreateUserRepository()
        const getUserByEmailRepository = new InMemoryGetUserByEmailRepository(
            createUserRepository
        )

        const createUserUseCase = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository
        )

        const { user } = await createUserUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        })

        await expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password up on registration', async () => {
        const createUserRepository = new InMemoryCreateUserRepository()
        const getUserByEmailRepository = new InMemoryGetUserByEmailRepository(
            createUserRepository
        )

        const createUserUseCase = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository
        )

        const { user } = await createUserUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        await expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const createUserRepository = new InMemoryCreateUserRepository()
        const getUserByEmailRepository = new InMemoryGetUserByEmailRepository(
            createUserRepository
        )

        const createUserUseCase = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository
        )

        const email = 'johndoe@email.com'

        await createUserUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })

        await expect(() =>
            createUserUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
