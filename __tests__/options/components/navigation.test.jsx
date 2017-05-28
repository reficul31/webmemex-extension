import React from 'react'
import Navigation from 'src/options/components/navigation'
import renderer from 'react-test-renderer'
import Routes from 'src/options/routes'

describe('navigation snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const routes = Routes
        const currentLocation = '/settings'
        const component = renderer.create(
            <Navigation currentLocation={currentLocation} routes={routes} />
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
