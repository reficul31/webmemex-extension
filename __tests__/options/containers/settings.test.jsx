import React from 'react'
import SettingsContainer from 'src/options/containers/settings'
import renderer from 'react-test-renderer'

describe('SettingsContainer snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const component = renderer.create(
            <SettingsContainer />
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
