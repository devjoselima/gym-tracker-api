import { Gym } from '@prisma/client'

export interface IGetGymById {
    execute(id: string): Promise<Gym | null>
}
