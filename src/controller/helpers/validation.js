import { badRequest } from './http.js'
import validator from 'validator'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const InvalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not a UUID',
    })
}
export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `The field ${field} is required`,
    })
}
export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            })

        if (fieldIsEmpty || fieldIsMissing) {
            return {
                ok: false,
                missingField: field,
            }
        }
    }
    return {
        ok: true,
        missingField: undefined,
    }
}
