import db from 'src/pouchdb'
import { reidentifyOrStorePage } from 'src/page-storage/store-page'
import { makeRemotelyCallable } from 'src/util/webextensionRPC'
import { whenPageLoadComplete, whenTabActive } from 'src/util/tab-events'
import delay from 'src/util/delay'

import { generateVisitDocId, isLoggable, shouldBeLogged } from '..'

/**
* Store the visit in PouchDB and return the visit instance as an object
*
* @param {Number} timestamp - timestamp of the visit
* @param {string} url - URL of the visit document
* @param {Page} page - page studb of the visit document
*
* @returns {Visit} - instance of the visit
*/
async function storeVisit({timestamp, url, page}) {
    const visitId = generateVisitDocId({timestamp})
    const visit = {
        _id: visitId,
        visitStart: timestamp,
        url,
        page: {_id: page._id}, // store only a reference to the page
    }
    await db.put(visit)
    return {visit}
}

/**
* Log page visit and create a visit instance in the database
*
* @param {Number} tabId - tabId of the current visit
* @param {string} url - URL of the visit document
*
* @returns {Visit} - instance of the visit
* @returns {Page} - instance of the Page
*/
export async function logPageVisit({
    tabId,
    url,
}) {
    // The time to put in documents.
    const timestamp = Date.now()

    // TODO first try to extend an existing visit instead of logging a new one.

    // First create an identifier for the page being visited.
    const {page, finalPagePromise} = await reidentifyOrStorePage({tabId, url})
    // Create a visit pointing to this page (analysing/storing it may still be in progress)
    const visit = await storeVisit({page, url, timestamp})

    // Wait until all page analyis/deduping is done before returning.
    const {page: finalPage} = await finalPagePromise

    // TODO possibly deduplicate the visit if the page was deduped too.

    return {visit, page: finalPage}
}

/**
* Checks if logging is enabled and if enabled, logs the page
*
* @param {Number} tabId - tabId of the current visit
* @param {string} url - URL of the visit document
*
* @returns {Visit} - instance of the visit
* @returns {Page} - instance of the Page
*/
export async function maybeLogPageVisit({
    tabId,
    url,
}) {
    // Check if we would want to log this page.
    if (!shouldBeLogged({url})) {
        return
    }

    // Check if logging is enabled by the user.
    const { loggingEnabled } = await browser.storage.local.get('loggingEnabled')
    if (!loggingEnabled) {
        return
    }

    // Wait for it to be fully ready.
    await whenPageLoadComplete({tabId})
    // Wait a bit to first let scripts run. TODO Do this in a smarter way.
    await delay(1000)
    // Wait until the tab is activated (not technically needed)
    await whenTabActive({tabId})

    return await logPageVisit({
        tabId,
        url,
    })
}

/**
* Log the visit/page in the currently active tab
*
* @returns {Visit} - instance of the visit
* @returns {Page} - instance of the Page
*/
export async function logActivePageVisit() {
    const tabs = await browser.tabs.query({active: true, currentWindow: true})
    const {url, id: tabId} = tabs[0]

    if (!isLoggable({url})) {
        throw new Error('This page cannot be stored.')
    }

    return await logPageVisit({
        tabId,
        url,
    })
}

// Expose to be callable from browser button popup
makeRemotelyCallable({logActivePageVisit})
