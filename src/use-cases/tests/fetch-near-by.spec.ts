import { beforeEach, describe, expect, it } from 'vitest'
import {
    InMemoryCreateGymRepository,
    InMemoryFetchNearBy,
} from '@/repositories/in-memory/in-memory-gyms-repositories'
import { FetchNearByGymsUseCase } from '../fetch-near-by-gyms'

let createGymRepository: InMemoryCreateGymRepository
let fetchGymsNearBy: InMemoryFetchNearBy
let sut: FetchNearByGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        createGymRepository = new InMemoryCreateGymRepository()
        fetchGymsNearBy = new InMemoryFetchNearBy(createGymRepository)
        sut = new FetchNearByGymsUseCase(fetchGymsNearBy)
    })

    it('should be able to fetch nearby gyms', async () => {
        await createGymRepository.execute({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -22.8889271,
            longitude: -43.3190064,
        })

        await createGymRepository.execute({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -22.7987937,
            longitude: -43.2058229,
        })

        const { gyms } = await sut.execute({
            userLatitude: -22.88892717,
            userLongitude: -43.3190064,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
    })
})
