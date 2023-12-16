import { Gym, Prisma } from '@prisma/client'

export interface FetchNearByParams {
    latitude: number
    longitude: number
}

export interface ICreateGymRepository {
    execute(data: Prisma.GymCreateInput): Promise<Gym>
}
export interface IGetGymByIdRepository {
    execute(id: string): Promise<Gym | null>
}

export interface ISearchGymsByTitleRepository {
    execute(query: string, page: number): Promise<Gym[]>
}

export interface IFetchNearByRepository {
    execute(params: FetchNearByParams): Promise<Gym[]>
}
