import maybeLogPageVisit from 'src/activity-logger/background/log-page-visit'
import * as activityLogger from 'src/activity-logger'
import * as storePage from 'src/page-storage/store-page'

afterAll(async () => {
    await db.destroy()
})

describe('maybeLogPageVisit mock tests', () => {
    test('should call the function isWorthRemembering', () => {
        const spy = jest.spyOn(activityLogger, 'isWorthRemembering')
        maybeLogPageVisit({tabId: 1, url: 'https://example.com'})
        expect(spy).toBeCalledWith({url: 'https://example.com'})
        spy.mockRestore()
    })

    test('should call the function reidentifyOrStorePage if isWorthRemembering is true', () => {
        const spy = jest.spyOn(storePage, 'reidentifyOrStorePage').mockReturnValueOnce({
            page: {},
            finalPagePromise: {},
        })
        maybeLogPageVisit({tabId: 1, url: 'https://example.com'})
        expect(spy).toBeCalledWith({tabId: 1, url: 'https://example.com'})
        spy.mockRestore()
    })

    test('should not call the function reidentifyOrStorePage if isWorthRemembering is false', () => {
        const spy = jest.spyOn(storePage, 'reidentifyOrStorePage')
        maybeLogPageVisit({tabId: 1, url: 'example.com'})
        expect(spy).toHaveBeenCalledTimes(0)
        spy.mockRestore()
    })
})
