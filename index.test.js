const sum = (a, b) => {
    return a + b
}

describe('sum funcion', () => {
    it('should sum two numbers correctly', () => {
        //arrange
        const a = 2
        const b = 2

        // act

        const result = sum(a, b)

        //assert
        expect(result).toBe(4)
    })
})
