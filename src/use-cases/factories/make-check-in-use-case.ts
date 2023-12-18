import {
    PrismaCreateCheckInRepository,
    PrismaFindManyCheckInsByUserDateRepository,
} from '@/repositories/prisma/check-in'
import { CreateCheckInUseCase } from '../checkin'
import { PrismaGetGymByIdRepository } from '@/repositories/prisma/gym/get-gym-by-id'

export function makeCheckIn() {
    const createCheckInRepository = new PrismaCreateCheckInRepository()

    const getCheckInByUserDateRepository =
        new PrismaFindManyCheckInsByUserDateRepository()

    const getGymByIdRepository = new PrismaGetGymByIdRepository()

    const useCase = new CreateCheckInUseCase(
        createCheckInRepository,
        getCheckInByUserDateRepository,
        getGymByIdRepository
    )

    return useCase
}
