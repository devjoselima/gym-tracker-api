import { beforeEach, describe, expect, it } from 'vitest'
import {
    InMemoryCreateGymRepository,
    InMemorySearchGymsByTitle,
} from '@/repositories/in-memory/in-memory-gyms-repositories'
import { SearchGymUseCase } from '../search-gym'

let createGymRepository: InMemoryCreateGymRepository
let searchGymsByTitleRepository: InMemorySearchGymsByTitle
let sut: SearchGymUseCase

describe('Search gyms by title', () => {
    beforeEach(async () => {
        createGymRepository = new InMemoryCreateGymRepository()
        searchGymsByTitleRepository = new InMemorySearchGymsByTitle(
            createGymRepository
        )
        sut = new SearchGymUseCase(searchGymsByTitleRepository)
    })

    it('should be able to search for gyms', async () => {
        await createGymRepository.execute({
            title: 'Javascript Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })

        await createGymRepository.execute({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })

        const { gyms } = await sut.execute({
            query: 'Typescript',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Typescript Gym' }),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await createGymRepository.execute({
                title: `Typescript Gym ${i}`,
                description: null,
                phone: null,
                latitude: 0,
                longitude: 0,
            })
        }
        const { gyms } = await sut.execute({
            query: 'Typescript',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Typescript Gym 21' }),
            expect.objectContaining({ title: 'Typescript Gym 22' }),
        ])
    })
})
