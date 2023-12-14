import { Gym, Prisma } from '@prisma/client'

export interface FetchNearByParams {
    latitude: number
    longitude: number
}

export interface ICreateGymRepository {
    execute(data: Prisma.GymCreateInput): Promise<Gym>
}
export interface IGetGymById {
    execute(id: string): Promise<Gym | null>
}

export interface ISearchGymsByTitle {
    execute(query: string, page: number): Promise<Gym[]>
}

export interface IFetchNearBy {
    execute(params: FetchNearByParams): Promise<Gym[]>
}
