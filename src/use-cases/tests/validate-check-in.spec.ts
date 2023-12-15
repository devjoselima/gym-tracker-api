import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckinUseCase } from '../validate-checkin'
import {
    InMemoryCreateCheckInsRepository,
    InMemoryGetCheckinById,
    InMemorySaveCheckinRepository,
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { ResourceNotFoundError } from '../errors'

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
})
