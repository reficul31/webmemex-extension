import React from 'react'
import Layout from 'src/options/layout'
import Routes from 'src/options/routes'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import renderer from 'react-test-renderer'

describe('Main component tests', () => {
    test('should mount without error and test against the given snapshot', () => {
        const component = renderer.create(
            <Router history={hashHistory}>
                <Route path='/' component={Layout}>
                    <IndexRedirect to='/settings' />
                    { Routes.map(route =>
                        <Route
                            key={route.pathname}
                            path={route.pathname}
                            component={route.component}
                    />
                )}
                </Route>
            </Router>
            )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
