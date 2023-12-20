import { PrismaSearchGymsByTitleRepository } from '@/repositories/prisma/gym/search-gyms-by-title-repository'
import { SearchGymUseCase } from '../search-gym'

export function makeSearchGymsUseCase() {
    const searchGymRepository = new PrismaSearchGymsByTitleRepository()
    const useCase = new SearchGymUseCase(searchGymRepository)

    return useCase
}
