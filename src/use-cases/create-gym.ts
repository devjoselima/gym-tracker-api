import { ICreateGymRepository } from '@/repositories/interfaces'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseParams {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private createGymRepository: ICreateGymRepository) {}
    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
        const gym = await this.createGymRepository.execute({
            title,
            description,
            phone,
            latitude,
            longitude,
        })

        return {
            gym,
        }
    }
}
