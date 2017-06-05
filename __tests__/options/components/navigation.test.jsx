import React from 'react'
import Navigation from 'src/options/components/navigation'
import { mount, shallow } from 'enzyme'
import Routes from 'src/options/routes'

describe('navigation snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const routes = Routes
        const currentLocation = Routes[0]
        const component = shallow(
            <Navigation currentLocation={currentLocation} routes={routes} />
        )
        expect(component).toMatchSnapshot()
    })

    test('should contain the props passed to it', () => {
        expect.assertions(2)
        const routes = Routes
        const currentLocation = Routes[0]
        const component = mount(
            <Navigation currentLocation={currentLocation} routes={routes} />
        )
        expect(component.prop('routes')).toBe(routes)
        expect(component.prop('currentLocation')).toBe(currentLocation)
    })
})
