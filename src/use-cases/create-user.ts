import { UserAlreadyExistsError } from '@/errors/user'
import {
    CreateUsersRepository,
    GetUserByEmailRepository,
} from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateUserUseCaseParams {
    name: string
    email: string
    password: string
}

interface CreateUserCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(
        private createUserRepository: CreateUsersRepository,
        private getUserByEmailRepository: GetUserByEmailRepository
    ) {}

    async execute({
        name,
        email,
        password,
    }: CreateUserUseCaseParams): Promise<CreateUserCaseResponse> {
        const password_hash = await hash(password, 6)

        const emailAlreadyExists = await this.getUserByEmailRepository.execute(
            email
        )

        if (emailAlreadyExists) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.createUserRepository.execute({
            name,
            email,
            password_hash,
        })

        return {
            user,
        }
    }
}
