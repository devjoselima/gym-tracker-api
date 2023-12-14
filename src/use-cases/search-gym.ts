import { ISearchGymsByTitle } from '@/repositories/interfaces'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseParams {
    query: string
    page: number
}

interface SearchGymUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymUseCase {
    constructor(private searchGymsByTitle: ISearchGymsByTitle) {}
    async execute({
        query,
        page,
    }: SearchGymUseCaseParams): Promise<SearchGymUseCaseResponse> {
        const gyms = await this.searchGymsByTitle.execute(query, page)

        return {
            gyms,
        }
    }
}
