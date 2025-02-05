import 'dotenv/config.js'
import express from 'express'
import {
    makeUpdateUserController,
    makeCreateUserController,
    makeGetUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js'

const app = express()

app.use(express.json())

app.get('/api/user/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserController()
    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserControler = makeCreateUserController()
    const { statusCode, body } = await createUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/user/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/user/:userId', async (request, response) => {
    const deleteUserControler = makeDeleteUserController()
    const { statusCode, body } = await deleteUserControler.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
