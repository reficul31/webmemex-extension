import React from 'react'
import Layout from 'src/options/layout'
import {shallow, mount} from 'enzyme'

describe('Layout snapshot tests', () => {
    test('should render without an error', () => {
        const location = {
            name: 'Settings',
            pathname: '/settings',
        }
        const tree = shallow(
            <Layout location={location}>
                <div>Layout Component</div>
            </Layout>
            )
        expect(tree).toMatchSnapshot()
    })

    test('should contain the props given to it', () => {
        const location = {
            name: 'Settings',
            pathname: '/settings',
        }
        const component = mount(
            <Layout location={location}>
                <div>Layout Component</div>
            </Layout>
            )
        expect(component.prop('location')).toBe(location)
    })
})
