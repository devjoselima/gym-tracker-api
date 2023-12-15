import { Prisma, CheckIn } from '@prisma/client'
import {
    ICountCheckInsByUserIdRepository,
    ICreateCheckInRepository,
    IFindManyCheckInsByUserIdRepository,
    IGetCheckInByUserDateRepository,
    IGetCheckinByIdRepository,
    ISaveCheckinRepository,
} from '../interfaces'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCreateCheckInsRepository
    implements ICreateCheckInRepository
{
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

export class InMemoryGetCheckInByUserDate
    implements IGetCheckInByUserDateRepository
{
    public items: CheckIn[] = []
    constructor(
        private createCheckInRepository: InMemoryCreateCheckInsRepository
    ) {
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

export class InMemoryFindManyCheckInsByUserId
    implements IFindManyCheckInsByUserIdRepository
{
    public items: CheckIn[] = []
    constructor(
        private createCheckInRepository: InMemoryCreateCheckInsRepository
    ) {
        this.items = createCheckInRepository.items
    }

    async execute(userId: string, page: number) {
        return this.items
            .filter((item) => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }
}

export class InMemoryCountCheckInsByUserId
    implements ICountCheckInsByUserIdRepository
{
    public items: CheckIn[] = []
    constructor(
        private createCheckInRepository: InMemoryCreateCheckInsRepository
    ) {
        this.items = createCheckInRepository.items
    }

    async execute(userId: string) {
        return this.items.filter((item) => item.user_id === userId).length
    }
}

export class InMemoryGetCheckinById implements IGetCheckinByIdRepository {
    public items: CheckIn[] = []
    constructor(
        private createCheckInRepository: InMemoryCreateCheckInsRepository
    ) {
        this.items = createCheckInRepository.items
    }

    async execute(id: string) {
        const checkIn = this.items.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }
}

export class InMemorySaveCheckinRepository implements ISaveCheckinRepository {
    public items: CheckIn[] = []
    constructor(
        private createCheckInRepository: InMemoryCreateCheckInsRepository
    ) {
        this.items = createCheckInRepository.items
    }

    async execute(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(
            (item) => item.id === checkIn.id
        )

        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }
}
