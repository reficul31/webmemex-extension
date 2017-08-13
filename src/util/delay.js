/**
* Creates a delay of the timeperiod specified
*
* @param {Number} t - timeperiod for the delay
*
* @returns {Promise} - resolves after a timeout
*/
export default function delay(t) {
    return new Promise(
        resolve => window.setTimeout(resolve, t)
    )
}
