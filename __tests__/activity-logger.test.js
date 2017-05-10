import {isWorthRemembering} from 'src/activity-logger'

describe('isWorthRemembering acceptance testing', ()=>{
    test('should accept links of type https://example.com', () => {
        expect(isWorthRemembering({url:'https://example.com'})).toBe(true)
    })
    test('should reject links of type example.com', () => {
        expect(isWorthRemembering({url:'example.com'})).toBe(false)
    })
})
