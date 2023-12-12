import { Gym, Prisma } from '@prisma/client'
import { IGetGymById, ICreateGymRepository } from '../interfaces'
import { randomUUID } from 'crypto'

export class InMemoryCreateGymRepository implements ICreateGymRepository {
    public items: Gym[] = []
    async execute(data: Prisma.GymCreateInput) {
        const gym = {
            id: randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }

        this.items.push(gym)

        return gym
    }
}
export class InMemoryGetGymById implements IGetGymById {
    public items: Gym[] = []
    constructor(private createGymRepository: InMemoryCreateGymRepository) {
        this.items = createGymRepository.items
    }
    async execute(id: String) {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
}
