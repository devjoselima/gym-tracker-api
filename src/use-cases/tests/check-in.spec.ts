import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CreateCheckInUseCase } from '../checkin'

let createCheckInRepository: InMemoryCheckInsRepository
let sut: CreateCheckInUseCase
describe('Check In use case', () => {
    beforeEach(() => {
        createCheckInRepository = new InMemoryCheckInsRepository()

        // SUT = SYSTEM UNDER TEST
        sut = new CreateCheckInUseCase(createCheckInRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
        })

        await expect(checkIn.id).toEqual(expect.any(String))
    })
})
