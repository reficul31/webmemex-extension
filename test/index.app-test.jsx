/* eslint-env jest */
/* eslint import/namespace: "off" */

import { maybeLogPageVisit } from 'src/activity-logger/background/log-page-visit'
import { dataURLToBlob } from 'blob-util'
import * as webextensionRPC from 'src/util/webextensionRPC'
import db from 'src/pouchdb'

import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'src/overview/store'
import overview from 'src/overview'

const imageDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGNiAAAABgADNjd8qAAAAABJRU5ErkJggg=='

jest.mock('src/util/webextensionRPC')
jest.mock('src/util/tab-events')

browser.tabs = {
    get: jest.fn().mockReturnValue({
        windowId: 1,
        favIconUrl: 'https://example.com/icon.ico',
    }),
    captureVisibleTab: jest.fn().mockReturnValue(imageDataUri),
}
browser.storage = {
    local: {
        get: jest.fn().mockReturnValue({loggingEnabled: true,
        }),
    },
}

beforeEach(() => {
    const freezeDry = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
            resolve('<html></html>')
        })
    )
    const extractPageContent = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
            resolve('page content')
        })
    )
    webextensionRPC.remoteFunction = jest.fn().mockReturnValueOnce(extractPageContent).mockReturnValueOnce(freezeDry)
})

afterAll(async () => {
    await db.destroy()
})

describe('App Test', () => {
    const urls = ['https://example.com/page', 'https://example.com/home', 'https://example.com/random']
    let favIcon, store, component

    beforeAll(async () => {
        favIcon = await dataURLToBlob(imageDataUri)
        fetch.mockResponse(favIcon)
        urls.map(async (url, idx) => {
            await maybeLogPageVisit({tabId: idx, url})            
        })
        store = configureStore()
        store.dispatch(overview.actions.init())
        component = await mount(
            <Provider store={store}>
                <div>
                    <overview.components.Overview grabFocusOnMount />
                </div>
            </Provider>
        )
    })

    test('should show the loading indicator', () => {
        expect(component.find('LoadingIndicator').exists()).toBe(true)
    })
})
