import clamp from 'lodash/fp/clamp'
import compose from 'lodash/fp/compose'

/**
* Create an affine transformation to map numbers from one range to another.
*
* @param {Array} domain - Domain range of values for input
* @param {Array} range - Range of values for mapping
* @param {boolean} clampOutput - whether the values above or below the range be capped or not
*
* @returns {Function} - range transform function
*/
export function makeRangeTransform({domain: [minX, maxX], range: [minY, maxY], clampOutput = false}) {
    const scale = (maxY - minY) / (maxX - minX)
    const bias = minY - minX * scale
    const transform = x => bias + x * scale
    return clampOutput ? compose(clamp(minY, maxY), transform) : transform
}

/**
* Create a transformation that passes the input through a monotonic nonlinearity
*
* @param {Array} domain - Domain range of values for input
* @param {Array} range - Range of values for mapping
* @param {Function} nonlinearity - non linearity function
* @param {boolean} clampOutput - whether the values above or below the range be capped or not
*
* returns {function} - non linear transform function
*/
export function makeNonlinearTransform({domain, range, nonlinearity, clampOutput = false}) {
    return function nonLinearTransform(input) {
        const toOutputRange = makeRangeTransform({
            domain: domain.map(nonlinearity),
            range,
            clampOutput,
        })
        return toOutputRange(nonlinearity(input))
    }
}
