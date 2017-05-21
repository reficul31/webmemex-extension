import React from 'react'
import DateRangeSelection from 'src/overview/components/DateRangeSelection'
import {shallow, mount} from 'enzyme'

describe('DateRangeSelection snapshot tests', () => {
	test('should mount without error containing two DatePicker', () => {
		Date.now = jest.fn(() => 1487076708000) 
		const startDate = new Date('10 02 2016').getMilliseconds()
		const endDate = new Date('10 02 2017').getMilliseconds()
		const onStartDateChange = jest.fn()
		const onEndDateChange = jest.fn()
		const component = shallow(
			<DateRangeSelection startDate={startDate} endDate={endDate} onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
			)
		expect(component).toMatchSnapshot()	
	})

	test('should contain the props given to it', () => {
		expect.assertions(4)
		const startDate = new Date('10 02 2016').getMilliseconds()
		const endDate = new Date('10 02 2017').getMilliseconds()
		const onStartDateChange = jest.fn()
		const onEndDateChange = jest.fn()
		const component = mount(
			<DateRangeSelection startDate={startDate} endDate={endDate} onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
			)
		expect(component.props().startDate).toBe(startDate)
		expect(component.props().endDate).toBe(endDate)
		expect(component.props().onEndDateChange).toBe(onEndDateChange)
		expect(component.props().onStartDateChange).toBe(onStartDateChange)
	})
})