import { PrismaFindManyCheckInsByIdRepository } from '@/repositories/prisma/check-in'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistory() {
    const findManyCheckInsByUserIdRepository =
        new PrismaFindManyCheckInsByIdRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(
        findManyCheckInsByUserIdRepository
    )

    return useCase
}
