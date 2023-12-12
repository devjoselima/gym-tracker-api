import { ResourceNotFoundError } from '@/errors/resource-not-found'
import {
    ICreateCheckInRepository,
    IGetCheckInByUserDate,
    IGetGymById,
} from '@/repositories/interfaces'
import { CheckIn } from '@prisma/client'
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinate'

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CreateCheckInUseCase {
    constructor(
        private createCheckInRepository: ICreateCheckInRepository,
        private getCheckInByUserDate: IGetCheckInByUserDate,
        private getGymByIdRepository: IGetGymById
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.getGymByIdRepository.execute(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // calculate distance between user and gym

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }

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
