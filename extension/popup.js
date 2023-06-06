'use strict'

// Variables
let titleFontSize = 20
let authorFontSize = 12
let affiliationFontSize = 12
let textColor = '#ffffff'
let backgroundColor = '#085d81'

// textProps
const options = {
    x: 0,
    y: 0,
    w: '100%',
    h: (24 * 2 * 1.5) / 72,
    align: 'center',
    fit: 'shrink',
    fontSize: 24,
    isTextBox: true,
    valign: 'middle',
}

// Get the authors separated by commas with reference numbers
// e.g. John Doe^1, Jane Doe^2, ...
const getAuthorsText = (paperInfo) => {
    const ret = []

    const authors = paperInfo.authors
    const affiliations = paperInfo.affiliations
    const affiliationsUnique = [...new Set(affiliations)]

    authors.forEach((author, index) => {
        // Add the author
        ret.push({ text: author })

        // Add the reference number
        const num = affiliationsUnique.findIndex((e) => e === affiliations[index]) + 1
        ret.push({
            text: num.toString(),
            options: { superscript: true },
        })

        // Add the separator
        if (index === authors.length - 2) ret.push({ text: ' and ' })
        else if (index !== authors.length - 1) ret.push({ text: ', ' })
    })
    return ret
}

// Get the affiliationiations separated by commas with reference numbers
// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffiliationsText = (paperInfo) => {
    // Delete duplicates
    const affiliationsUnique = [...new Set(paperInfo.affiliations)]
    const ret = []

    affiliationsUnique.forEach((affiliation, index) => {
        // Add the reference number
        ret.push({
            text: (index + 1).toString(),
            options: { superscript: true },
        })
        // Add the affiliation
        ret.push({ text: affiliation })
        // Add the separator
        if (index !== affiliationsUnique.length - 1) ret.push({ text: ', ' })
    })
    return ret
}

// Generate pptx
const save = (papersInfo) => {
    // Create a new presentation
    let pres = new PptxGenJS()

    // Create slides
    papersInfo.forEach((paperInfo) => {
        // Add a slide
        let slide = pres.addSlide()
        let y, fontSize, h

        // Add background of header
        slide.addShape(pres.ShapeType.rect, {
            x: 0,
            y: 0,
            w: '100%',
            h: (titleFontSize * 2 * 1.5 + authorFontSize * 1.5 + affiliationFontSize * 1.5) / 72, // 1 inch = 72 points
            fill: { color: backgroundColor },
        })

        // Add the title
        y = 0
        fontSize = titleFontSize
        h = (fontSize * 2 * 1.5) / 72
        slide.addText(paperInfo.title, {
            ...options,
            y: y,
            h: h,
            bold: true,
            color: textColor,
            fontSize: fontSize,
        })

        // Add the authors
        y += h
        fontSize = authorsFontSize
        h = (fontSize * 1.5) / 72
        slide.addText(getAuthorsText(paperInfo), {
            ...options,
            y: y,
            h: h,
            color: textColor,
            fontSize: fontSize,
        })

        // Add the affiliations
        y += h
        fontSize = affiliationFontSize
        h = (fontSize * 1.5) / 72
        slide.addText(getAffiliationsText(paperInfo), {
            ...options,
            y: y,
            h: h,
            color: textColor,
            fontSize: fontSize,
        })
    })

    // Save the presentation
    pres.writeFile()
}

// When the download button is clicked, get the papers info and let the pptx file downloaded
document.addEventListener('DOMContentLoaded', () => {
    // Title font size
    const titleFontSizeSlider = document.querySelector('.title .fontSize input.slider')
    const titleFontSizeText = document.querySelector('.title .fontSize input.text')
    titleFontSizeSlider.addEventListener('input', (e) => {
        titleFontSize = e.target.value
        titleFontSizeText.value = e.target.value
    })
    titleFontSizeText.addEventListener('input', (e) => {
        titleFontSize = e.target.value
        titleFontSizeSlider.value = e.target.value
    })

    // Author font size
    const authorFontSizeSlider = document.querySelector('.author .fontSize input.slider')
    const authorFontSizeText = document.querySelector('.author .fontSize input.text')
    authorFontSizeSlider.addEventListener('input', (e) => {
        authorsFontSize = e.target.value
        authorFontSizeText.value = e.target.value
    })
    authorFontSizeText.addEventListener('input', (e) => {
        authorsFontSize = e.target.value
        authorFontSizeSlider.value = e.target.value
    })

    // Affiliation font size
    const affiliationFontSizeSlider = document.querySelector('.affiliation .fontSize input.slider')
    const affiliationFontSizeText = document.querySelector('.affiliation .fontSize input.text')
    affiliationFontSizeSlider.addEventListener('input', (e) => {
        authorFontSize = e.target.value
        affiliationFontSizeText.value = e.target.value
    })
    affiliationFontSizeText.addEventListener('input', (e) => {
        authorFontSize = e.target.value
        affiliationFontSizeSlider.value = e.target.value
    })

    // Text color
    document.querySelector('.text .color input').addEventListener('input', (e) => {
        textColor = e.target.value
        document.querySelector('.text .color .text').innerText = e.target.value
    })

    // Background color
    document.querySelector('.background .color input').addEventListener('input', (e) => {
        backgroundColor = e.target.value
        document.querySelector('.background .color .text').innerText = e.target.value
    })

    // Add listener to the save button
    document.getElementById('saveBtn').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'getPapersInfo' }, (response) => {
                save(response)
            })
        })
    })
})

// Check if the current tab URL is matching
function isUrlMatching(url) {
    const pattern = /^https:\/\/pgl\.jp\/seminars\/.+\/sessions\/.+$/
    return pattern.test(url)
}

// Check the current tab URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url
    const saveBtn = document.getElementById('saveBtn')

    if (isUrlMatching(url)) {
        saveBtn.disabled = false
        saveBtn.style.cursor = 'pointer'
    } else {
        saveBtn.disabled = true
        saveBtn.style.cursor = 'default'
    }
})
