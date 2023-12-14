import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import {
    InMemoryCreateCheckInsRepository,
    InMemoryFindManyCheckInsByUserId,
} from '@/repositories/in-memory/in-memory-checkins-repository'

let createCheckInRepository: InMemoryCreateCheckInsRepository
let findManyCheckInsByUserId: InMemoryFindManyCheckInsByUserId
let sut: FetchUserCheckInsHistoryUseCase

describe('Find many check ins by user ID', () => {
    beforeEach(async () => {
        createCheckInRepository = new InMemoryCreateCheckInsRepository()
        findManyCheckInsByUserId = new InMemoryFindManyCheckInsByUserId(
            createCheckInRepository
        )
        sut = new FetchUserCheckInsHistoryUseCase(findManyCheckInsByUserId)
    })

    it('should be able to fetch check-in repository', async () => {
        await createCheckInRepository.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await createCheckInRepository.execute({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await createCheckInRepository.execute({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' }),
        ])
    })
})
