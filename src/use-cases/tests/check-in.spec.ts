import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import {
    InMemoryCheckInsRepository,
    InMemoryGetCheckInByUserDate,
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { CreateCheckInUseCase } from '../checkin'
import {
    InMemoryCreateGymRepository,
    InMemoryGetGymById,
} from '@/repositories/in-memory/in-memory-gyms-repositories'
import { Decimal } from '@prisma/client/runtime/library'

let createGymRepository: InMemoryCreateGymRepository
let createCheckInRepository: InMemoryCheckInsRepository
let getCheckInByUserDate: InMemoryGetCheckInByUserDate
let getGymByIdRepository: InMemoryGetGymById
let sut: CreateCheckInUseCase

describe('Check In use case', () => {
    beforeEach(async () => {
        createGymRepository = new InMemoryCreateGymRepository()
        createCheckInRepository = new InMemoryCheckInsRepository()
        getCheckInByUserDate = new InMemoryGetCheckInByUserDate(
            createCheckInRepository
        )
        getGymByIdRepository = new InMemoryGetGymById(createGymRepository)

        // SUT = SYSTEM UNDER TEST
        sut = new CreateCheckInUseCase(
            createCheckInRepository,
            getCheckInByUserDate,
            getGymByIdRepository
        )

        await createGymRepository.execute({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() =>
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        getGymByIdRepository.items.push({
            id: 'gym-02',
            title: 'Typescript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-22.8860098),
            longitude: new Decimal(-43.3185209),
        })

        await expect(() =>
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',
                userLatitude: -22.891367,
                userLongitude: -43.3120192,
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
