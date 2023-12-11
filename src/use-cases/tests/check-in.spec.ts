import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import {
    InMemoryCheckInsRepository,
    InMemoryGetCheckInByUserDate,
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { CreateCheckInUseCase } from '../checkin'

let createCheckInRepository: InMemoryCheckInsRepository
let getCheckInByUserDate: InMemoryGetCheckInByUserDate
let sut: CreateCheckInUseCase

describe('Check In use case', () => {
    beforeEach(() => {
        createCheckInRepository = new InMemoryCheckInsRepository()
        getCheckInByUserDate = new InMemoryGetCheckInByUserDate(
            createCheckInRepository
        )

        // SUT = SYSTEM UNDER TEST
        sut = new CreateCheckInUseCase(
            createCheckInRepository,
            getCheckInByUserDate
        )

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
        })

        await expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
        })

        await expect(() =>
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
        })

        await expect(checkIn.id).toEqual(expect.any(String))
    })
})
