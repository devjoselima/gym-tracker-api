import { Gym } from '@prisma/client'
import { IGetGymById } from '../interfaces'

export class InMemoryGetGymById implements IGetGymById {
    public items: Gym[] = []
    async execute(id: String) {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
}
