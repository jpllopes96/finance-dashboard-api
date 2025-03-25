import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUserError } from '../../errors/users.js'
import jwt from 'jsonwebtoken'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        //check if the email is already in use

        const userWithProvidadedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidadedEmail) {
            throw new EmailAlreadyInUserError(createUserParams.email)
        }

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

        const createdUser = await this.createUserRepository.execute(user)

        const tokens = {
            accessToken: jwt.sign(
                { userId: user.id },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' },
            ),

            refreshToken: jwt.sign(
                { userId: user.id },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: '30d' },
            ),
        }

        return { ...createdUser, tokens }
    }
}
