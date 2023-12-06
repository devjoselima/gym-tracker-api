import { UserAlreadyExistsError } from '@/errors/user'
import {
    CreateUsersRepository,
    GetUserByEmailRepository,
} from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface CreateUserUseCaseParams {
    name: string
    email: string
    password: string
}

export class CreateUserUseCase {
    constructor(
        private createUserRepository: CreateUsersRepository,
        private getUserByEmailRepository: GetUserByEmailRepository
    ) {}

    async execute({ name, email, password }: CreateUserUseCaseParams) {
        const password_hash = await hash(password, 6)

        const emailAlreadyExists = await this.getUserByEmailRepository.execute(
            email
        )

        if (emailAlreadyExists) {
            throw new UserAlreadyExistsError()
        }

        await this.createUserRepository.execute({
            name,
            email,
            password_hash,
        })
    }
}
