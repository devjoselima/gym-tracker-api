import { IFindManyCheckInsByUserId } from '@/repositories/interfaces'

import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryInUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private findManyCheckInsByUserId: IFindManyCheckInsByUserId) {}

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryInUseCaseRequest): Promise<FetchUserCheckInsHistoryResponse> {
        const checkIns = await this.findManyCheckInsByUserId.execute(
            userId,
            page
        )

        return {
            checkIns,
        }
    }
}
