import {isWorthRemembering, generateVisitDocId, convertVisitDocId, getTimestamp} from 'src/activity-logger'
import randomString from 'src/util/random-string'

describe('isWorthRemembering acceptance tests', ()=>{
    test('should accept links of type https://example.com', () => {
        expect(isWorthRemembering({url:'https://example.com'})).toBeTruthy()
    })

    test('should reject links of type example.com', () => {
        expect(isWorthRemembering({url:'example.com'})).toBeFalsy()
    })
})

describe('generateVisitDocId tests', () => {
    test('should return visit docid with timestamp and nonce', () => {
        const timestamp = Date.now()
        const nonce = randomString()
        let docid = convertVisitDocId({timestamp, nonce})
        expect(generateVisitDocId({timestamp, nonce})).toBe(docid)
    })

    test('should return visit docid without arguments', () => {
        let expected = expect.stringMatching('^visit\/[0-9]{13}\/[0-9]{10}$')
        expect(generateVisitDocId()).toEqual(expected)
    })
})

describe('getTimestamp tests', () => {
    test('should return the timestamp for a given doc', () => {
        const timestamp = Date.now()
        let doc = {
            _id: generateVisitDocId({timestamp}),
        }
        expect(getTimestamp(doc)).toEqual(timestamp)
    })
})
