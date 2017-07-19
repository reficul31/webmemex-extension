/* eslint-env jest */

import eventToPromise from 'src/util/event-to-promise'

function returnRejectOpts(message) {
    return {
        event: {
            addListener: jest.fn(),
        },
        filter: undefined,
        reason: {message: message},
    }
}

function returnResolveOpts(value) {
    return {
        event: {
            addListener: jest.fn(),
        },
        filter: undefined,
        value: value,
    }
}

describe('eventToPromise', () => {
    test('should listen for the events', async () => {
        expect.assertions(2)
        const resolveOpt = returnResolveOpts('test')
        const rejectOpt = returnRejectOpts('Error')
        eventToPromise({
            resolve: resolveOpt,
            reject: rejectOpt,
        })
        expect(resolveOpt.event.addListener).toBeCalled()
        expect(rejectOpt.event.addListener).toBeCalled()
    })
})
