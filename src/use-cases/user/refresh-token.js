import { UnauthorizedError } from '../../errors/users.js'

export class RefreshTokenUseCase {
    constructor(tokenGeneratorAdapter, tokenVerifierAdpater) {
        this.tokenGeneratorAdapter = tokenGeneratorAdapter
        this.tokenVerifierAdpater = tokenVerifierAdpater
    }

    execute(refresToken) {
        try {
            const decodedToken = this.tokenVerifierAdpater.execute(
                refresToken,
                process.env.JWT_REFRESH_TOKEN_SECRET,
            )

            if (!decodedToken) {
                throw new UnauthorizedError()
            }

            return this.tokenGeneratorAdapter.execute(decodedToken.userId)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedError()
        }
    }
}
