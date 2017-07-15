/* eslint-env jest */

import getFavIcon from 'src/page-analysis/background/get-fav-icon'
import * as responseToDataURI from 'src/util/response-to-data-uri'

fetch.mockResponse(new Blob(), { 'status': 200, 'statusText': 'Response Accepted' })

describe('getFavIcon tests', () => {
    test('should return undefined when the favIconUrl is undefined', async () => {
        browser.tabs = {
            get: jest.fn().mockReturnValue({
                favIconUrl: undefined,
            }),
        }
        const favicon = await getFavIcon({tabId: 1})
        expect(favicon).toBeUndefined()
    })

    test('should call the function responseToDataURI', async () => {
        const spy = jest.spyOn(responseToDataURI, 'default')
        browser.tabs = {
            get: jest.fn().mockReturnValue({
                favIconUrl: 'https://example.com',
            }),
        }
        await getFavIcon({tabId: 1})
        expect(spy).toHaveBeenCalled()
    })
})
