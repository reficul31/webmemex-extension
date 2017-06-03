import inlineImages from 'src/freeze-dry/inline-images'
import * as whenAllSettled from 'src/util/when-all-settled'
import * as common from 'src/freeze-dry/common'

beforeAll(() => {
    common.inlineUrlsInAttributes = jest.fn()
})

describe('inlineImages tests', () => {
    test('should call whenAllSettled with the jobs', async () => {
        const spy = jest.spyOn(whenAllSettled, 'default')
        const rootElement = window.document.implementation.createHTMLDocument()
        const docUrl = 'about:blank'
        const jobs = [
            common.inlineUrlsInAttributes({...{}, rootElement, docUrl}),
            common.inlineUrlsInAttributes({...{}, rootElement, docUrl}),
            common.inlineUrlsInAttributes({...{}, rootElement, docUrl}),
        ]
        await inlineImages({rootElement, docUrl})
        expect(spy).toHaveBeenCalledWith(jobs)
        spy.mockRestore()
    })
})
