/* eslint-env jest */

import responseToDataURI from 'src/util/response-to-data-uri'

fetch.mockResponse(new Blob(), { 'status': 200, 'statusText': 'Response Accepted' })

describe('responseToDataURI tests', () => {
    test('should convert a response to a dataUri', async () => {
        const response = await fetch('https://example.com', {cache: 'force-cache'})
        const dataUri = await responseToDataURI(response)
        expect(dataUri).toBe('data:;base64,')
    })
})
