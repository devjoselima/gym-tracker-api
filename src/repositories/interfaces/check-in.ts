import { Prisma, CheckIn } from '@prisma/client'

export interface ICreateCheckInRepository {
    execute(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
export interface IGetCheckInByUserDateRepository {
    execute(userId: string, date: Date): Promise<CheckIn | null>
}

export interface IFindManyCheckInsByUserIdRepository {
    execute(userId: string, page: number): Promise<CheckIn[]>
}

export interface ICountCheckInsByUserIdRepository {
    execute(userId: string): Promise<number>
}

export interface IGetCheckinByIdRepository {
    execute(id: string): Promise<CheckIn | null>
}

export interface ISaveCheckinRepository {
    execute(checkIn: CheckIn): Promise<CheckIn>
}
