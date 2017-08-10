// Stuff that is to be accessible from other modules (folders)

import docuri from 'docuri'
import randomString from 'src/util/random-string'

export const visitKeyPrefix = 'visit/'

/**
* Creates an _id string given the variables, or vice versa parses such strings
* We simply use the creation time for the id, for easy chronological sorting.
* We add a random string we call a 'nonce' to prevent accidental collisions.
*
* @param {Number} timestamp - timestamp of the document
* @param {Number} nonce - random 10 digit number
*
* @returns {String} - string id of the document
*/
export const convertVisitDocId = docuri.route(`${visitKeyPrefix}:timestamp/:nonce`)

/**
* Extract the type, timestamp and nonce from an ID of a document
*
* @param {String} - string id of the document
*/
const convertAnyTimestampedDocId = docuri.route(':type/:timestamp/:nonce')
export const getTimestamp = doc =>
    Number.parseInt(convertAnyTimestampedDocId(doc._id).timestamp)

/**
* Generate a visit document ID from the timestamp and a random string
*
* @param {Number} timestamp - timestamp of the visit document
* @param {Number} nonce - random 10 digit number
*
* @returns {string} - document id of the visit document
*/
export function generateVisitDocId({timestamp, nonce} = {}) {
    const date = timestamp ? new Date(timestamp) : new Date()
    return convertVisitDocId({
        timestamp: date.getTime(),
        nonce: nonce || randomString(),
    })
}

/**
* Tell whether a page can be stored
*
* @param {string} url - url of the visit document
*
* @returns {boolean} - whether or not the page is loggable
*/
export function isLoggable({url}) {
    // Only http(s) pages. Ignoring data URLs, newtab, ...
    const loggableUrlPattern = /^https?:\/\//
    return loggableUrlPattern.test(url)
}

/**
* Tell whether a page should be stored
*
* @param {string} url - url of the visit document
*
* @returns {boolean} - whether or not the page should be stored
*/
export function shouldBeLogged({url}) {
    // Currently, we log everything that we think we can log.
    // TODO Add ignore-/blacklist lookup here (issue #22, #94)
    return isLoggable({url})
}
