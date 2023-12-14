import { ICountCheckInsByUserId } from '@/repositories/interfaces'

interface GetUserMetricsRequest {
    userId: string
}

interface GetUserMetricsResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private findManyCheckInsByUserId: ICountCheckInsByUserId) {}

    async execute({
        userId,
    }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
        const checkInsCount = await this.findManyCheckInsByUserId.execute(
            userId
        )

        return {
            checkInsCount,
        }
    }
}
