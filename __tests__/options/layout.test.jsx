import React from 'react'
import Layout from 'src/options/layout'
import renderer from 'react-test-renderer'
import { Router, Route, hashHistory } from 'react-router'

describe('Layout snapshot tests', () => {
	test('should test against the given snapshot', () => {
		const component = renderer.create(
	    <Router history={hashHistory}>
	        <Route path='/' component={Layout}>
	        </Route>
	    </Router> 
			)
		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})