import docuri from 'docuri'
import randomString from 'src/util/random-string'

export const pageKeyPrefix = 'page/'

export const convertPageDocId = docuri.route(`${pageKeyPrefix}:timestamp/:nonce`)

/**
* Generate a page doc id
*
* @param {Number} timestamp - timestamp of the page
* @param {string} nonce - random string of 10 digit number
*
* @returns {string} - doc id of the page as a string
*/
export function generatePageDocId({timestamp, nonce} = {}) {
    const date = timestamp ? new Date(timestamp) : new Date()
    return convertPageDocId({
        timestamp: date.getTime(),
        nonce: nonce || randomString(),
    })
}
