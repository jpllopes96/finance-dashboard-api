import { UnauthorizedError } from '../../errors/users.js'
import { badRequest, ok, serverError, unauthorized } from '../helpers/index.js'
import { refreshTokenSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'

export class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await refreshTokenSchema.parseAsync(params)

            const response = this.refreshTokenUseCase.execute(
                params.refreshToken,
            )
            return ok(response)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                return unauthorized()
            }
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            return serverError()
        }
    }
}
