import React from 'react'
import LoadingIndicator from 'src/overview/components/LoadingIndicator'
import renderer from 'react-test-renderer'

describe('LoadingIndicator snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const component = renderer.create(
            <LoadingIndicator />
            )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
