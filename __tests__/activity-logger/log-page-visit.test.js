import maybeLogPageVisit from 'src/activity-logger/background/log-page-visit'
import * as activityLogger from 'src/activity-logger'
import * as storePage from 'src/page-storage/store-page'
jest.mock('src/pouchdb')

afterAll(() => {
	pouchdb.destroyDatabase()
})

describe('maybeLogPageVisit tests', () => {
	test('calls the function isWorthRemembering', () => {
			activityLogger.isWorthRemembering = jest.fn()
			maybeLogPageVisit({tabId:12345, url:'www.example.com'})
			expect(activityLogger.isWorthRemembering).toBeCalledWith({url:'www.example.com'})
	})

	test('calls the function reidentifyOrStorePage', () => {
		storePage.reidentifyOrStorePage = jest.fn()
		maybeLogPageVisit({tabId:12345, url:'https://example.com'})
		expect(storePage.reidentifyOrStorePage).toBeCalledWith({tabId:12345, url:'https://example.com'})
	})
})