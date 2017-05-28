import React from 'react'
import VisitAsListItem from 'src/overview/components/VisitAsListItem'
import renderer from 'react-test-renderer'
import * as row from './row.data.json'
import * as niceTimeModule from 'src/util/nice-time'
import * as pageViewer from 'src/page-viewer'

describe('VisitAsListItem snapshot tests', () => {
    test('should test against the given snapshot', () => {
        const spy = jest.spyOn(niceTimeModule, 'default')
                    .mockReturnValueOnce('20 minutes ago')
        const component = renderer.create(
            <VisitAsListItem doc={row.doc} compact={false} />
            )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        spy.mockRestore()
    })

    test('should call the niceTime util', () => {
        const spy = jest.spyOn(niceTimeModule, 'default')
        renderer.create(
            <VisitAsListItem doc={row.doc} compact={false} />
            )
        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
    })

    test('should check for the localVersion', () => {
        const spy = jest.spyOn(pageViewer, 'localVersionAvailable')
        renderer.create(
            <VisitAsListItem doc={row.doc} compact={false} />
            )
        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
    })
})
