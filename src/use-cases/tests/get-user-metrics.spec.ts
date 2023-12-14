import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics'
import {
    InMemoryCreateCheckInsRepository,
    InMemoryCountCheckInsByUserId,
} from '@/repositories/in-memory/in-memory-checkins-repository'

let createCheckInRepository: InMemoryCreateCheckInsRepository
let countCheckInsByUserId: InMemoryCountCheckInsByUserId
let sut: GetUserMetricsUseCase

describe('Get user metrics Use Case', () => {
    beforeEach(async () => {
        createCheckInRepository = new InMemoryCreateCheckInsRepository()
        countCheckInsByUserId = new InMemoryCountCheckInsByUserId(
            createCheckInRepository
        )
        sut = new GetUserMetricsUseCase(countCheckInsByUserId)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await createCheckInRepository.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await createCheckInRepository.execute({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})
