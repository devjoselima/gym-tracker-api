import {
    IGetCheckinByIdRepository,
    ISaveCheckinRepository,
} from '@/repositories/interfaces'
import { CheckIn } from '@prisma/client'
import { LateCheckInValidationError, ResourceNotFoundError } from './errors'
import dayjs from 'dayjs'

interface ValidateCheckinUseCaseParams {
    checkInId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(
        private validateCheckin: IGetCheckinByIdRepository,
        private saveChecking: ISaveCheckinRepository
    ) {}
    async execute({
        checkInId,
    }: ValidateCheckinUseCaseParams): Promise<ValidateCheckinUseCaseResponse> {
        const checkIn = await this.validateCheckin.execute(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.saveChecking.execute(checkIn)

        return {
            checkIn,
        }
    }
}
