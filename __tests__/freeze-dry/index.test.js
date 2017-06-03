import freezeDry from 'src/freeze-dry/index'
import * as whenAllSettled from 'src/util/when-all-settled'
import * as inlineStyles from 'src/freeze-dry/inline-styles'
import * as removeScripts from 'src/freeze-dry/remove-scripts'
import * as inlineImages from 'src/freeze-dry/inline-images'
import * as fixLinks from 'src/freeze-dry/fix-links'

beforeAll(() => {
    inlineStyles.default = jest.fn()
    removeScripts.default = jest.fn()
    inlineImages.defualt = jest.fn()
    fixLinks.default = jest.fn()
})

describe('freezeDry tests', () => {
    test('should call the whenAllSettled with all the jobs', async () => {
        const spy = jest.spyOn(whenAllSettled, 'default')
        const rootElement = window.document.implementation.createHTMLDocument()
        const docUrl = 'about:blank'
        const jobs = [
            removeScripts.default({rootElement}),
            inlineStyles.default({rootElement, docUrl}),
            inlineImages.default({rootElement, docUrl}),
            fixLinks.default({rootElement, docUrl}),
        ]
        await freezeDry()
        expect(spy).toHaveBeenCalledWith(jobs)
        spy.mockRestore()
    })

    test('should return the HTML document as a string', async () => {
        const html = await freezeDry()
        expect(html).toBe('<html><head></head><body></body></html>')
    })
})
