/* eslint-env jest */

import updateDoc from 'src/util/pouchdb-update-doc'
import db from 'src/pouchdb'

describe('updateDoc', () => {
    test('should call the database functions', async () => {
        expect.assertions(2)
        db.put = jest.fn()
        db.get = jest.fn()
        const docId = 'page/1234567890123/1234567890'
        const updateFunc = jest.fn()
        await updateDoc(db, docId, updateFunc)
        expect(db.get).toHaveBeenCalledWith(docId)
        expect(db.put).toHaveBeenCalledTimes(1)
    })
})
