import { IGetCheckinById, ISaveCheckin } from '@/repositories/interfaces'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors'

interface ValidateCheckinUseCaseParams {
    checkInID: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(
        private validateCheckin: IGetCheckinById,
        private saveChecking: ISaveCheckin
    ) {}
    async execute({
        checkInID,
    }: ValidateCheckinUseCaseParams): Promise<ValidateCheckinUseCaseResponse> {
        const checkIn = await this.validateCheckin.execute(checkInID)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.saveChecking.execute(checkIn)

        return {
            checkIn,
        }
    }
}
