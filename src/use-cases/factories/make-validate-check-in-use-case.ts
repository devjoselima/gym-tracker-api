import {
    PrismaGetCheckInByIdRepository,
    PrismaSaveCheckInRepository,
} from '@/repositories/prisma/check-in'
import { ValidateCheckinUseCase } from '../validate-checkin'

export function makeValidateCheckIn() {
    const getCheckInByIdRepository = new PrismaGetCheckInByIdRepository()
    const saveCheckInRepository = new PrismaSaveCheckInRepository()
    const useCase = new ValidateCheckinUseCase(
        getCheckInByIdRepository,
        saveCheckInRepository
    )

    return useCase
}
