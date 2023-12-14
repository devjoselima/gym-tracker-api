import { IFindManyCheckInsByUserId } from '@/repositories/interfaces'

import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryInUseCaseRequest {
    userId: string
}

interface FetchUserCheckInsHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private findManyCheckInsByUserId: IFindManyCheckInsByUserId) {}

    async execute({
        userId,
    }: FetchUserCheckInsHistoryInUseCaseRequest): Promise<FetchUserCheckInsHistoryResponse> {
        const checkIns = await this.findManyCheckInsByUserId.execute(userId)

        return {
            checkIns,
        }
    }
}
