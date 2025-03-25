import {
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
} from '../../repositories/postgres/index.js'

import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
} from '../../use-cases/index.js'

import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserBalanceController,
    LoginUserController,
    RefreshTokenController,
} from '../../controller/index.js'

import {
    TokenVerifierAdapter,
    TokensGeneratorAdapter,
} from '../../adapters/index.js'
export const makeGetUserController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    const getUserByEmailRepostiory = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepostiory,
        createUserRepository,
    )

    const createUserControler = new CreateUserController(createUserUseCase)

    return createUserControler
}

export const makeUpdateUserController = () => {
    const getUserByEmailRepostiory = new PostgresGetUserByEmailRepository()
    const updetaUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepostiory,
        updetaUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserControler = new DeleteUserController(deleteUserUseCase)

    return deleteUserControler
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    )

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}

export const makeLoginUserController = () => {
    const getUserByEmailRepostiory = new PostgresGetUserByEmailRepository()
    const loginUserUseCase = new LoginUserUseCase(getUserByEmailRepostiory)
    const loginUserController = new LoginUserController(loginUserUseCase)
    return loginUserController
}

export const makeRefreshTokenController = () => {
    const tokenGeneratorAdpater = new TokensGeneratorAdapter()
    const tokenVerifierAdapter = new TokenVerifierAdapter()

    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokenGeneratorAdpater,
        tokenVerifierAdapter,
    )

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase,
    )

    return refreshTokenController
}
