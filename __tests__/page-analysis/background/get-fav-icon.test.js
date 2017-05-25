import getFavIcon from 'src/page-analysis/background/get-fav-icon'
import * as responseToDataURI from 'src/util/response-to-data-uri'

describe('getFavIcon tests', async () => {
	test('should call the browser function to get the favicon', async () => {
		browser.tabs = {
			get: jest.fn().mockReturnValue({
				favIconUrl: undefined
			})
		}
		const favicon = await getFavIcon({tabId:1})
		expect(browser.tabs.get).toHaveBeenCalled()
	})

	test('should return undefined when faviIcon url is not available', async () => {
		browser.tabs = {
			get: jest.fn().mockReturnValue({
				favIconUrl: undefined
			})
		}
		const favicon = await getFavIcon({tabId:1})
		expect(favicon).toBeUndefined()
	})

	// @todo test for the response data uri function to have been called
})