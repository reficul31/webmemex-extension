import React from 'react'
import ImgFromPouch from 'src/overview/components/ImgFromPouch'
import renderer from 'react-test-renderer'

describe('ImgFromPouch snapshot tests', () => {
	test('should test against the given snapshot', () => {
		const component = renderer.create(
			<ImgFromPouch />
			)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})