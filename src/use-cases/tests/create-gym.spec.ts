import { InMemoryCreateGymRepository } from '@/repositories/in-memory/in-memory-gyms-repositories'
import { CreateGymUseCase } from '../create-gym'
import { beforeEach, describe, expect, it } from 'vitest'

let createGymRepository: InMemoryCreateGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        createGymRepository = new InMemoryCreateGymRepository()
        sut = new CreateGymUseCase(createGymRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        await expect(gym.id).toEqual(expect.any(String))
    })
})
