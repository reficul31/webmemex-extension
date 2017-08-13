import db from 'src/pouchdb'
import { findPagesByUrl } from 'src/search/find-pages'
import analysePage from 'src/page-analysis/background'
import tryDedupePage from './deduplication'
import { generatePageDocId } from '.'

/**
* Try see if we can tell in advance that this page will be one we already know.
* Returns the matching page doc, if any.
*
* @param {Number} tabId - tab ID of the active page
* @param {string} url - URL of the page to be reidentified
* @param {Array} samePageCandidates - Array of Pages
*/
async function tryReidentifyPage({tabId, url, samePageCandidates}) {
    // TODO check ETag or other proof of equality.

    // No match found. We will have to make a new page.
    return undefined
}

/**
* Create a page stub in the database and return a page
*
* @param {string} url - URL of the page stub to be created
*
* @returns {Page} - Page instance of the current page
*/
async function createPageStub({url}) {
    const pageId = generatePageDocId()
    const page = {
        _id: pageId,
        url,
    }
    await db.put(page)
    return page
}

/**
* Analyse the page and Deduplicate it
*
* @param {Number} tabId - tab ID of the active page
* @param {Page} page - Page instance to be analysed and deduplicated
* @param {Array} samePageCandidates - Array of Pages containing similar pages
*
* @returns {Page} - final Page instance after deduplication and analysis
*/
async function analyseAndTryDedupePage({tabId, page, samePageCandidates}) {
    // Add info to the page doc by analysing the document in the tab.
    const {page: analysedPage} = await analysePage({page, tabId})

    // Knowing more about the page now, try find it again in our memory.
    const {page: finalPage} = await tryDedupePage({page: analysedPage, samePageCandidates})

    // Return the resulting page (likely still the same as analysedPage)
    return {page: finalPage}
}

/**
* Tries to reidentify the page in the tab, or creates a new page doc for it.
* Either way, it returns the page doc. If a new page was created, it starts
* page analysis and then deduplication, and also returns a promise
* (finalPagePromise) of the page doc resulting from these steps.
*
* @param {Number} tabId - tab ID of the active page
* @param {string} url - url of the page to be stored
*
* @returns {Page} - Page instance of the page
* @returns {finalPagePomise} - Promise that resolves to an analysed and deduplicated page
*/
export async function reidentifyOrStorePage({tabId, url}) {
    // Find pages we know that had the same URL.
    const samePageCandidates = (await findPagesByUrl({url})).rows.map(row => row.doc)

    // Check if we can already tell in advance that this is the same page.
    const reusablePage = await tryReidentifyPage({tabId, url, samePageCandidates})

    if (reusablePage) {
        // Equality is known (or assumed) in advance. Reuse the old page as is.
        return {page: reusablePage}
    } else {
        // Create a new page doc in the database.
        const page = await createPageStub({url})

        // Start analysis and (possibly) deduplication, but do not wait for it.
        const finalPagePromise = analyseAndTryDedupePage({
            tabId,
            page,
            samePageCandidates,
        })

        // Return the page stub, and a promise of the analysed & deduped page.
        return {page, finalPagePromise}
    }
}
