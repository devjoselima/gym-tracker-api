import { PrismaFetchNearByRepository } from '@/repositories/prisma/gym'
import { FetchNearByGymsUseCase } from '../fetch-near-by-gyms'

export function makeFetchNearbyGyms() {
    const fetchNearby = new PrismaFetchNearByRepository()
    const useCase = new FetchNearByGymsUseCase(fetchNearby)

    return useCase
}
