import { badRequest, notFound } from './http.js'
import validator from 'validator'

export const InvalidPasswordResponse = () => {
    return badRequest({
        message: `Password must be at least 6 characters`,
    })
}

export const EmailAlreadyInUseResponse = () => {
    return badRequest({
        message: `Invalid e-mail. Please provide a valid one.`,
    })
}

export const userNotFoundResponse = () =>
    notFound({ messege: 'User not found.' })
export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmaailIsValid = (email) => validator.isEmail(email)
