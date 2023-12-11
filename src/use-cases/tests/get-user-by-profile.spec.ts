import {
    InMemoryCreateUserRepository,
    InMemoryGetUserByIdRepository,
} from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from '../get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

let createUserRepository: InMemoryCreateUserRepository
let getUserByIdRepository: InMemoryGetUserByIdRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        createUserRepository = new InMemoryCreateUserRepository()
        getUserByIdRepository = new InMemoryGetUserByIdRepository(
            createUserRepository
        )
        sut = new GetUserProfileUseCase(getUserByIdRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await createUserRepository.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.name).toEqual('John Doe')
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                userId: 'not-existing-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
