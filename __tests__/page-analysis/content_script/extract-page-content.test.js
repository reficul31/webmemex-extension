import extractPageContent from 'src/page-analysis/content_script/extract-page-content'
import * as extractPdfContent from 'src/page-analysis/content_script/extract-pdf-content'
import * as extractPageText from 'src/page-analysis/content_script/extract-page-text'
jest.mock('page-metadata-parser')

describe('extractPageContent tests', () => {
    test('should call extractPdfContent if url ends with pdf', async () => {
        extractPdfContent.default = jest.fn()
        await extractPageContent({
            loc: 'https://example.com',
            url: 'https://example.com/doc.pdf',
            doc: 'document',
        })
        expect(extractPdfContent.default).toHaveBeenCalled()
    })

    test('should call extractPageText if url does not end with pdf', async () => {
        extractPageText.default = jest.fn()
        await extractPageContent({
            loc: 'https://example.com',
            url: 'https://example.com/blog/post',
            doc: 'document',
        })
        expect(extractPageText.default).toHaveBeenCalled()
    })
})
