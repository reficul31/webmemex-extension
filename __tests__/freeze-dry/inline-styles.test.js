import inlineStyles from 'src/freeze-dry/inline-styles'
import * as common from 'src/freeze-dry/common'

fetch.mockResponse(new Blob(), { 'status': 200, 'statusText': 'Response Accepted' })

describe('inlineStyles tests', () => {
    test('should return dataUri of the response with inline styles', async () => {
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><head><link rel="stylesheet" type="text/css" href="https://example.com/theme.css"></head></html>',
             'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineStyles({rootElement, docUrl})
        expect(rootElement.querySelector('link').getAttribute('href')).toBe('data:text/css;charset=UTF-8,')
    })

    test('should convert the url in <style> to dataUris', async () => {
        expect.assertions(2)
        const dataUri = 'data:text/plain;charset=utf-8;base64,aHR0cHM6Ly9leGFtcGxlLmNvbS9wdWJsaWMvaW1hZ2UvYmFja2dyb3VuZC5qcGVn'
        const spy = jest.spyOn(common, 'urlToDataUri').mockReturnValue(dataUri)
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><head><style type="text/css">div{background-image: url("public/image/background.jpeg");}</style></head><div></div></html>',
            'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineStyles({rootElement, docUrl})
        expect(spy).toHaveBeenCalled()
        expect(rootElement.querySelector('style').innerHTML).toBe(`div{background-image: url(${dataUri});}`)
        spy.mockRestore()
    })

    test('should convert the url in "style" to dataUris', async () => {
        expect.assertions(2)
        const dataUri = 'data:text/plain;charset=utf-8;base64,aHR0cHM6Ly9leGFtcGxlLmNvbS9wdWJsaWMvaW1hZ2UvYmFja2dyb3VuZC5qcGVn'
        const spy = jest.spyOn(common, 'urlToDataUri').mockReturnValue(dataUri)
        const parser = new DOMParser()
        const rootElement = parser.parseFromString(
            '<html><div style="background-image: url(\'public/image/background.jpeg\');"></div></html>',
            'text/html'
             )
        const docUrl = 'https://example.com'
        await inlineStyles({rootElement, docUrl})
        expect(spy).toHaveBeenCalled()
        expect(rootElement.querySelector('div').getAttribute('style')).toBe(`background-image: url(${dataUri});`)
        spy.mockRestore()
    })
})
