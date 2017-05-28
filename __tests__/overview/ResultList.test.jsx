import React from 'react'
import ResultList from 'src/overview/components/ResultList'
import { shallow } from 'enzyme'
import * as search from './search.data.json'

describe('ResultList snapshot tests', () => {
    test('should compare against the snapshot given', () => {
        const searchResult = search
        const searchQuery = ''
        const component = shallow(
            <ResultList searchResult={searchResult} searchQuery={searchQuery} />
            )
        expect(component).toMatchSnapshot()
    })

    test('should compare against the snapshot of no results', () => {
        const searchResult = {
            'rows': [],
        }
        const searchQuery = ''
        const component = shallow(
            <ResultList searchResult={searchResult} searchQuery={searchQuery} />
        )
        expect(component).toMatchSnapshot()
    })
})
