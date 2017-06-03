import { inlineUrlsInAttributes, urlToDataUri } from 'src/freeze-dry/common'
import * as responseToDataUri from 'src/util/response-to-data-uri'

fetch.mockResponse(new Blob(), { 'status': 200, 'statusText': 'Response Accepted' })

describe('urlToDataUri tests', () => {
    test('should return a valid dataUri for a URL', async () => {
        const spy = jest.spyOn(responseToDataUri, 'default')
        await urlToDataUri('https://example.com')
        expect(spy).toHaveBeenCalled()
        spy.mockRestore()
    })
})

describe('inlineUrlsInAttributes tests', () => {
    test('should change the URL in <img> tag to a dataUri', async () => {
        expect.assertions(2)
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><body><img src="public/image/background.png" alt="background" /></body></html>',
             'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineUrlsInAttributes({elements: 'img', attributes: 'src', fixIntegrity: true, rootElement, docUrl})
        expect(rootElement.querySelector('img').getAttribute('data-original-src')).toBe('public/image/background.png')
        expect(rootElement.querySelector('img').getAttribute('src')).toBe('data:;base64,')
    })

    test('should change the URL in the <link> tag to a dataUri', async () => {
        expect.assertions(2)
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><head><link rel="icon" href="public/image/favicon.ico"></head></html>',
             'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineUrlsInAttributes({elements: 'link', attributes: 'href', fixIntegrity: true, rootElement, docUrl})
        expect(rootElement.querySelector('link').getAttribute('data-original-href')).toBe('public/image/favicon.ico')
        expect(rootElement.querySelector('link').getAttribute('href')).toBe('data:;base64,')
    })

    test('should change the URL in srcset of the <img> tag to a dataUri', async () => {
        expect.assertions(2)
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><body><img src="background.png" alt="background" srcset="background.png 200w,background.png 400w"></body></html>',
             'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineUrlsInAttributes({elements: 'img', attributes: 'srcset', fixIntegrity: true, rootElement, docUrl})
        expect(rootElement.querySelector('img').getAttribute('data-original-srcset')).toBe('background.png 200w,background.png 400w')
        expect(rootElement.querySelector('img').getAttribute('srcset')).toBe('data:;base64,')
    })

    test('should remove the attribute integrity from the tag', async () => {
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><head><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous"></head></html>',
             'text/html'
            )
        const docUrl = 'https://example.com'
        await inlineUrlsInAttributes({elements: 'link', attributes: 'href', fixIntegrity: true, rootElement, docUrl})
        expect(rootElement.querySelector('link').getAttribute('integrity')).toBeNull()
    })
})
