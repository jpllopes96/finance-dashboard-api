import { badRequest } from './http.js'
import validator from 'validator'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const InvalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not a UUID',
    })
}
