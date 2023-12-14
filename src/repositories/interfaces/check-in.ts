import { Prisma, CheckIn } from '@prisma/client'

export interface ICreateCheckInRepository {
    execute(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
export interface IGetCheckInByUserDate {
    execute(userId: string, date: Date): Promise<CheckIn | null>
}

export interface IFindManyCheckInsByUserId {
    execute(userId: string): Promise<CheckIn[]>
}
