/*
* Returns a random string of 10 digits
*
* @returns {string} - random string of 10 digits
*/
export default function randomString() {
    // Return a string of ten digits.
    return Math.random().toString().substring(2, 12)
}
