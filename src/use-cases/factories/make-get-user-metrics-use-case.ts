import { PrismaCountCheckInsByUserIdRepository } from '@/repositories/prisma/check-in'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetrics() {
    const checkInsRepository = new PrismaCountCheckInsByUserIdRepository()
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}
