import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckinUseCase } from '../validate-checkin'
import {
    InMemoryCreateCheckInsRepository,
    InMemoryGetCheckinById,
    InMemorySaveCheckinRepository,
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { LateCheckInValidationError, ResourceNotFoundError } from '../errors'

let createCheckInRepository: InMemoryCreateCheckInsRepository
let getCheckinById: InMemoryGetCheckinById
let saveCheckinRepository: InMemorySaveCheckinRepository
let sut: ValidateCheckinUseCase

describe('Validate Check-in Use Case', () => {
    beforeEach(async () => {
        createCheckInRepository = new InMemoryCreateCheckInsRepository()
        getCheckinById = new InMemoryGetCheckinById(createCheckInRepository)
        saveCheckinRepository = new InMemorySaveCheckinRepository(
            createCheckInRepository
        )

        sut = new ValidateCheckinUseCase(getCheckinById, saveCheckinRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await createCheckInRepository.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const { checkIn } = await sut.execute({
            checkInID: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(createCheckInRepository.items[0].validated_at).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() =>
            sut.execute({
                checkInID: 'inexistent-check-in-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('sould not be able to validate the check-in after twenty minutes after creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await createCheckInRepository.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() =>
            sut.execute({
                checkInID: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })
})
