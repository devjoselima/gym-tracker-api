import { User, Prisma } from '@prisma/client'
import {
    ICreateUsersRepository,
    IGetUserByEmailRepository,
    IGetUserByIdRepository,
} from '../interfaces'

export class InMemoryCreateUserRepository implements ICreateUsersRepository {
    public items: User[] = []
    async execute(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user)

        return user
    }
}

export class InMemoryGetUserByEmailRepository
    implements IGetUserByEmailRepository
{
    public items: User[] = []
    constructor(private createUserRepository: InMemoryCreateUserRepository) {
        this.items = createUserRepository.items
    }

    async execute(email: string) {
        const user = this.items.find((item) => item.email === email)

        if (!user) {
            return null
        }

        return user
    }
}

export class InMemoryGetUserByIdRepository implements IGetUserByIdRepository {
    public items: User[] = []

    constructor(private createUserRepository: InMemoryCreateUserRepository) {
        this.items = createUserRepository.items
    }

    async execute(id: string) {
        const user = this.items.find((item) => item.id === id)

        if (!user) {
            return null
        }

        return user
    }
}
