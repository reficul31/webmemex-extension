import fixLinks from 'src/freeze-dry/fix-links'

describe('fixLinks tests', () => {
    test('should append a base with the href of doc', async () => {
        expect.assertions(2)
        const rootElement = window.document.implementation.createHTMLDocument()
        const docUrl = 'about:blank'
        await fixLinks({rootElement, docUrl})
        expect(rootElement.getElementsByTagName('base').length).toBe(1)
        expect(rootElement.querySelector('base').getAttribute('href')).toBe(docUrl)
    })

    test('should do nothing for correct URLs', async () => {
        const rootElement = window.document.createElement('div')
        rootElement.innerHTML = '<a href="https://example.com/#home">Link</a>'
        const docUrl = 'https://example.com/'
        await fixLinks({rootElement, docUrl})
        expect(rootElement.querySelector('*[href]').getAttribute('href')).toBe('https://example.com/#home')
    })

    test('should correct dirty URLs', async () => {
        const rootElement = window.document.createElement('div')
        rootElement.innerHTML = '<a href="#home">Link</a>'
        const docUrl = 'https://example.com'
        await fixLinks({rootElement, docUrl})
        expect(rootElement.querySelector('*[href]').getAttribute('href')).toBe('https://example.com/#home')
    })
})
