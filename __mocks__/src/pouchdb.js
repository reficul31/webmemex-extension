import PouchDB from 'pouchdb-node'
import PouchDBMemory from 'pouchdb-adapter-memory'

PouchDB.plugin(PouchDBMemory)

const pouchdbOptions = {
    name: 'testdb',
    auto_compaction: true,
    adapter: 'memory',
}

const db = PouchDB(pouchdbOptions)
export default db
