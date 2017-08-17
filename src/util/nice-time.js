/**
* Returns the hour as a string
*
* @param {Date} date - date to be processed
*
* @returns {string} - hour of the Date as a string
*/
function hourString(date) {
    // return date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
}

/**
* Returns the day as a string
*
* @param {Date} date - date to be processed
*
* @returns {string} - day of the Date as a string
*/
function dayString(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[date.getDay()]
}

/**
* Returns the month as a string
*
* @param {Date} date - date to be processed
*
* @returns {string} - month of the Date as a string
*/
function monthString(date) {
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return months[date.getMonth()]
}

/**
* Used to format the time format to get a readable string
*
* @param {Date} date - date to be processed
* @param {Date} now - date from where the difference is to be measured
*
* @returns {string} - a human redable formatted string for the time of the Date instance from now
*/
export default function niceTime(date, {now = undefined} = {}) {
    const then = new Date(date)
    now = now || new Date()
    const secondsAgo = (now - then) / 1000
    if (secondsAgo < -60 * 60 * 24) {
        return 'in the future?!'
    }
    if (secondsAgo < -60) {
        return 'soon?!'
    }
    if (secondsAgo < 90) { return 'now' }
    if (secondsAgo < 60 * 10) { return `${Math.round(secondsAgo / 60)} minutes ago` }
    if (secondsAgo < 60 * 60) { return `${Math.round(secondsAgo / 60 / 5) * 5} minutes ago` }
    if (secondsAgo < 60 * 60 * 24
        && (now.getDay() === then.getDay() || secondsAgo < 60 * 60 * 6)) { return hourString(then) }
    if (secondsAgo < 60 * 60 * 24) { return `Yesterday ${hourString(then)}` }
    if (secondsAgo < 60 * 60 * 24 * 3) { return `${dayString(then)} ${hourString(then)}` }
    if (then.getYear() === now.getYear()) { return `${then.getDate()} ${monthString(then)}` }
    return `${then.getDate()} ${monthString(then)} ${then.getFullYear()}`
}

/**
* Used to format the date format to get a readable string
*
* @param {Date} date - date to be processed
* @param {Date} now - date from where the difference is to be measured
*
* @returns {string} - a human redable formatted string for the date of the Date instance from now
*/
export function niceDate(date, {now = new Date()} = {}) {
    const then = new Date(date)
    if (then.getYear() !== now.getYear()) {
        return `${then.getDate()} ${monthString(then)} ${then.getFullYear()}`
    }
    if (then.getMonth() === now.getMonth()) {
        const daysAgo = now.getDate() - then.getDate()
        if (daysAgo === 0) return `Today`
        if (daysAgo === 1) return `Yesterday`
    }
    return `${dayString(then)} ${then.getDate()} ${monthString(then)}`
}
