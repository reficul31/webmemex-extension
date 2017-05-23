import { getHistoryStats, getOldestVisitTimestamp, importHistory } from 'src/browser-history/background/import-history'
import * as activityLogger from 'src/activity-logger'

describe('getOldestVisitTimestamp tests', () => {
	test('should return undefined when database is empty', async () => {
		const oldestVisit = await getOldestVisitTimestamp()
		expect(oldestVisit).toBeUndefined()
	})

	test('should call the function convertVisitDocId', async () => {
		const spy = jest.spyOn(activityLogger, 'convertVisitDocId')
		db.allDocs = jest.fn().mockReturnValue({
			"rows": [
				{"id": "visit/1234567890123/1234567890"},
				{"id": "visit/0987654321098/0987654321"}
			]
		})
		const oldestVisit = await getOldestVisitTimestamp()
		expect(spy).toHaveBeenCalledWith("visit/1234567890123/1234567890")
	})
})

describe('getHistoryStats tests', () => {
	test('should return the quantity of items in browser history', async () => {
		browser.history = {
			search: jest.fn().mockReturnValue([
				{
					url: 'https://example.com'
				}])
		}
		const historyStats = await getHistoryStats()
		expect(historyStats.quantity).toBe(1)
	})
})