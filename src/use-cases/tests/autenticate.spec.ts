import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'

import {
    InMemoryCreateUserRepository,
    InMemoryGetUserByEmailRepository,
} from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

let createUserRepository: InMemoryCreateUserRepository
let getUserByEmailRepository: InMemoryGetUserByEmailRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        createUserRepository = new InMemoryCreateUserRepository()
        getUserByEmailRepository = new InMemoryGetUserByEmailRepository(
            createUserRepository
        )
        sut = new AuthenticateUseCase(getUserByEmailRepository) // SUT = SYSTEM UNDER TEST
    })

    it('should be able to authenticate user', async () => {
        const sut = new AuthenticateUseCase(getUserByEmailRepository) // SUT = SYSTEM UNDER TEST

        await createUserRepository.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await createUserRepository.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '1234567',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
