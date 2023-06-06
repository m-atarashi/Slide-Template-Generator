// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getPapersInfo') {
        // Get papers info
        const papersInfo = getPapersInfo()
        sendResponse(papersInfo)
    }
})

const getPapersInfo = () => {
    // Get titles
    const titles = Array.from(
        document.querySelectorAll('div[class="ui divided list"] .item'),
        (e) => e.innerText
    )

    // Get authors and affiliations
    const authorsInfo = Array.from(
        document.querySelectorAll('.main div[class="ui divided horizontal list"]')
    )

    // Iterate over each paper, extract and store its title, authors, and affiliations
    const res = []
    titles.forEach((title, i) => {
        // Get authors
        const authors = Array.from(authorsInfo[i].querySelectorAll('.header'), (e) => e.innerText)

        // Get affiliations
        const affiliations = Array.from(
            authorsInfo[i].querySelectorAll('.description'),
            (e) => e.innerText.split(',')[0]
        )

        // Add to res
        res.push({ title, authors, affiliations })
    })

    return res
}
