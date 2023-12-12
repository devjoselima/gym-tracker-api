import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from '../create-user'
import { compare } from 'bcryptjs'
import {
    InMemoryCreateUserRepository,
    InMemoryGetUserByEmailRepository,
} from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors'

let createUserRepository: InMemoryCreateUserRepository
let getUserByEmailRepository: InMemoryGetUserByEmailRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
    beforeEach(() => {
        createUserRepository = new InMemoryCreateUserRepository()
        getUserByEmailRepository = new InMemoryGetUserByEmailRepository(
            createUserRepository
        )

        // SUT = SYSTEM UNDER TEST
        sut = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository
        )
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        })

        await expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password up on registration', async () => {
        const { user } = await sut.execute({
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
        const email = 'johndoe@email.com'

        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
