import { prisma } from '@/lib/prisma'
import {
    FetchNearByParams,
    IFetchNearByRepository,
} from '@/repositories/interfaces'
import { Gym } from '@prisma/client'

export class PrismaFetchNearByRepository implements IFetchNearByRepository {
    async execute({ latitude, longitude }: FetchNearByParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }
}
