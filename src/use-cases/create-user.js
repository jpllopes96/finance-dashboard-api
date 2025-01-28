import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TODO: check if the email is already in use
        //generate UUID for user
        const userId = uuidv4()

        // crypt the password
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //insert the user on DB
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        //call repository
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
