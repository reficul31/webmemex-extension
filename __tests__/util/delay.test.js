import delay from 'src/util/delay'
jest.useFakeTimers()

describe('delay tests', () => {
    test('should return with the given delay', () => {
        expect.assertions(2)
        delay(1000)
        expect(setTimeout.mock.calls.length).toBe(1)
        expect(setTimeout.mock.calls[0][1]).toBe(1000)
    })
})
