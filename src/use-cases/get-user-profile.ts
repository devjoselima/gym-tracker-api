import { ResourceNotFoundError } from './errors'
import { IGetUserByIdRepository } from '@/repositories/interfaces'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private getUserByIdRepository: IGetUserByIdRepository) {}

    async execute({
        userId,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}
