import { prisma } from '../../../../prisma/prisma.js'
export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await prisma.user.create({
            data: {
                id: createUserParams.id,
                first_name: createUserParams.first_name,
                last_name: createUserParams.last_name,
                password: createUserParams.password,
                email: createUserParams.email,
            },
        })

        return user
    }
}
