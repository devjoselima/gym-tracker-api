import { Gym, Prisma } from '@prisma/client'
import {
    IGetGymByIdRepository,
    ICreateGymRepository,
    ISearchGymsByTitleRepository,
    IFetchNearByRepository,
    FetchNearByParamsRepository,
} from '../interfaces'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/use-cases/utils/get-distance-between-coordinate'

export class InMemoryCreateGymRepository implements ICreateGymRepository {
    public items: Gym[] = []
    async execute(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
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
export class InMemoryGetGymById implements IGetGymByIdRepository {
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
export class InMemorySearchGymsByTitle implements ISearchGymsByTitleRepository {
    public items: Gym[] = []
    constructor(private createGymRepository: InMemoryCreateGymRepository) {
        this.items = createGymRepository.items
    }

    async execute(query: string, page: number) {
        return this.items
            .filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }
}

export class InMemoryFetchNearBy implements IFetchNearByRepository {
    public items: Gym[] = []
    constructor(private createGymRepository: InMemoryCreateGymRepository) {
        this.items = createGymRepository.items
    }

    async execute(params: FetchNearByParamsRepository) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                {
                    latitude: params.latitude,
                    longitude: params.longitude,
                },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber(),
                }
            )

            return distance < 10
        })
    }
}
