import { Prisma, CheckIn } from '@prisma/client'
import { ICreateCheckInRepository } from '../interfaces-repositories'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements ICreateCheckInRepository {
    public items: CheckIn[] = []
    async execute(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at
                ? new Date(data.validated_at)
                : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}
