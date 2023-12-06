import { User, Prisma } from '@prisma/client'
import {
    CreateUsersRepository,
    GetUserByEmailRepository,
} from '../users-repository'

export class InMemoryCreateUserRepository implements CreateUsersRepository {
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
    implements GetUserByEmailRepository
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
