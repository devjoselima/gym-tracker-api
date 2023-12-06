import { expect, describe, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { compare } from 'bcryptjs'

describe('Create User Use Case', () => {
    it('should hash user password up on registration', async () => {
        const createUserUseCase = new CreateUserUseCase(
            {
                async execute(data) {
                    return {
                        id: 'user-1',
                        name: data.name,
                        email: data.email,
                        password_hash: data.password_hash,
                        created_at: new Date(),
                    }
                },
            },
            {
                async execute(email) {
                    return null
                },
            }
        )

        const { user } = await createUserUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})
