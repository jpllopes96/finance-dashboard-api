import jwt from 'jsonwebtoken'

export const auth = (request, response, next) => {
    try {
        //get access token from header
        const accessToken = request.headers?.authorization?.split('Bearer ')[1]
        if (!accessToken) {
            return response.status(401).send({ message: 'Unauthorized' })
        }

        //check if access token is valid
        const decodedToeken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
        )

        if (!decodedToeken) {
            return response.status(401).send({ message: 'Unauthorized' })
        }

        request.userId = decodedToeken.userId
        //if valid proceed/
        next()
    } catch (error) {
        console.log(error)
        return response.status(401).send({ message: 'Unauthorized' })
    }
    //if unvalid return 401
}
