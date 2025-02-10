import {
    CreateTransactionController,
    GetTransactionByUserIdController,
} from '../../controller/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresGetUserByIdRepository,
    PostgresGetTransactionByUserId,
} from '../../repositories/postgres/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionByUserIdUseCase,
} from '../../use-cases/index.js'

export const makeCreateTransactionController = () => {
    const createTranscationRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTranscationRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionsByUserId = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionByUserId()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getTransactionsByUserIdUseCase = new GetTransactionByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    )

    const getTransactionsByUseIdController =
        new GetTransactionByUserIdController(getTransactionsByUserIdUseCase)

    return getTransactionsByUseIdController
}
