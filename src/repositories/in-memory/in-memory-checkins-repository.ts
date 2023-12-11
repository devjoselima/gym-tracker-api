import { Prisma, CheckIn } from '@prisma/client'
import {
    ICreateCheckInRepository,
    IGetCheckInByUserDate,
} from '../interfaces-repositories'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

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

export class InMemoryGetCheckInByUserDate implements IGetCheckInByUserDate {
    public items: CheckIn[] = []
    constructor(private createCheckInRepository: InMemoryCheckInsRepository) {
        this.items = createCheckInRepository.items
    }

    async execute(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate =
                checkInDate.isAfter(startOfTheDay) &&
                checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }
}