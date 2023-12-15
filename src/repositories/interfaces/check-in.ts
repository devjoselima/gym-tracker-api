import { Prisma, CheckIn } from '@prisma/client'

export interface ICreateCheckInRepository {
    execute(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
export interface IGetCheckInByUserDate {
    execute(userId: string, date: Date): Promise<CheckIn | null>
}

export interface IFindManyCheckInsByUserId {
    execute(userId: string, page: number): Promise<CheckIn[]>
}

export interface ICountCheckInsByUserId {
    execute(userId: string): Promise<number>
}

export interface IGetCheckinById {
    execute(id: string): Promise<CheckIn | null>
}

export interface ISaveCheckin {
    execute(checkIn: CheckIn): Promise<CheckIn>
}
