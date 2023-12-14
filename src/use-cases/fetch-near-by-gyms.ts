import { IFetchNearBy } from '@/repositories/interfaces'
import { Gym } from '@prisma/client'

interface FetchNearByGymsParams {
    userLatitude: number
    userLongitude: number
}

interface FetchNearByGymsResponse {
    gyms: Gym[]
}

export class FetchNearByGymsUseCase {
    constructor(private fetchNearByGyms: IFetchNearBy) {}
    async execute({
        userLatitude,
        userLongitude,
    }: FetchNearByGymsParams): Promise<FetchNearByGymsResponse> {
        const gyms = await this.fetchNearByGyms.execute({
            latitude: userLatitude,
            longitude: userLongitude,
        })

        return {
            gyms,
        }
    }
}
