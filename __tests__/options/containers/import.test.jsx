import React from 'react'
import ImportContainer from 'src/options/containers/import'
import renderer from 'react-test-renderer'

describe('ImportContainer snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const component = renderer.create(
            <ImportContainer />
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
