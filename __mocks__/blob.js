/**
 * Creates a fake blob for node.js environment.
 * The fake blob is a node.js Buffer with the type property added.
 * @param parts
 * @param options
 * @constructor
 */
module.exports = function Blob(parts, options) {
    const blob = Buffer.concat(parts.map(Buffer.from))
    blob.type = (options && options.type) || ''
    return blob
}