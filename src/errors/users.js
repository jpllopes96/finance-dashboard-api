export class EmailAlreadyInUserError extends Error {
    constructor(email) {
        super(`the E-mail ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}
