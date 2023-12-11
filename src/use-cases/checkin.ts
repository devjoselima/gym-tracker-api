import {
    ICreateCheckInRepository,
    IGetCheckInByUserDate,
} from '@/repositories/interfaces-repositories'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CreateCheckInUseCase {
    constructor(
        private createCheckInRepository: ICreateCheckInRepository,
        private getCheckInByUserDate: IGetCheckInByUserDate
    ) {}

    async execute({
        userId,
        gymId,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInOnSameDay = await this.getCheckInByUserDate.execute(
            userId,
            new Date()
        )

        if (checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.createCheckInRepository.execute({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn,
        }
    }
}
