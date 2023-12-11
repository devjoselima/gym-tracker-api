import { ICreateCheckInRepository } from '@/repositories/interfaces-repositories'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CreateCheckInUseCase {
    constructor(private createCheckInRepository: ICreateCheckInRepository) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest) {
        const checkIn = await this.createCheckInRepository.execute({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn,
        }
    }
}
