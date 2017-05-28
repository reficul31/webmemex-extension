import React from 'react'
import { LinkToLocalVersion, localVersionAvailable } from 'src/page-viewer'
import renderer from 'react-test-renderer'
import page from './page.data.json'

describe('LinkToLocalVersion snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const component = renderer.create(
            <LinkToLocalVersion page={page}>
                <img src='img/save-icon.png' alt='💾 saved' />
            </LinkToLocalVersion>
            )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe('localVersionAvailable tests', () => {
    test('should return true when the page is available', () => {
        let page = {
            '_attachments': {
                'frozen-page.html': 'htmldoc',
            },
        }
        expect(localVersionAvailable({page})).toBeTruthy()
    })

    test('should return false when the content is not available', () => {
        let page = {
            '_attachments': {},
        }
        expect(localVersionAvailable({page})).toBeFalsy()
    })
})
