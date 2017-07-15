/* eslint-env jest */

import whenAllSettled from 'src/util/when-all-settled'

describe('whenAllSettled', () => {
    test('should call console.error if no rejection handler is provided', async () => {
        const promises = []
        promises.push(new Promise((resolve, reject) => {
            reject(new Error('Failed Promise'))
        }))
        console.error = jest.fn()
        await whenAllSettled(promises)
        expect(console.error).toHaveBeenCalledWith(new Error('Failed Promise'))
    })

    test('should resolve return promise when a promise is rejected', () => {
        const promises = []
        promises.push(new Promise((resolve, reject) => {
            resolve()
        }))
        promises.push(new Promise((resolve, reject) => {
            reject(new Error('Failed Promise'))
        }))
        const rejectHandler = jest.fn()
        const thenableFunc = jest.fn()
        const errorFunc = jest.fn()
        whenAllSettled(promises, {onRejection: rejectHandler}).then(thenableFunc()).catch(errorFunc())
        expect(thenableFunc).toHaveBeenCalledTimes(1)
    })

    test('should not call reject handler when promises resolve', async () => {
        const promises = []
        promises.push(new Promise((resolve, reject) => {
            resolve()
        }))
        promises.push(new Promise((resolve, reject) => {
            resolve()
        }))
        promises.push(new Promise((resolve, reject) => {
            resolve()
        }))
        const rejectHandler = jest.fn()
        await whenAllSettled(promises, {onRejection: rejectHandler})
        expect(rejectHandler).toHaveBeenCalledTimes(0)
    })

    test('should call on reject handler when promise is rejected', async () => {
        const promises = []
        promises.push(new Promise((resolve, reject) => {
            resolve()
        }))
        promises.push(new Promise((resolve, reject) => {
            reject(new Error('Failed Promise'))
        }))
        promises.push(new Promise((resolve, reject) => {
            reject(new Error('Failed Promise'))
        }))
        const rejectHandler = jest.fn()
        await whenAllSettled(promises, {onRejection: rejectHandler})
        expect(rejectHandler).toHaveBeenCalledTimes(2)
    })
})
