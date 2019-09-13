const i18n = require("@freesewing/i18n").strings
const capitalize = require("@freesewing/utils/capitalize")
const options = require('@freesewing/pattern-info').options
const patterns = require('@freesewing/pattern-info').list

const  translate = key => i18n[process.env.GATSBY_LANGUAGE][key] || key

const pageTitle = (slug, page) => {
  if (page.frontmatter.title === "") {
    let chunks = slug.split('/');
    // Perhaps a pattern option or sub page
    if (chunks[1] === "docs" && chunks[2] === "patterns") {
      if (chunks.length === 7 && chunks[4] === "options") {
        // This is a pattern option
        for (let option of options[chunks[3]]) {
          if (option.toLowerCase() === chunks[5]) return translate(`options.${chunks[3]}.${option}.title`)
        }
      }
      if (chunks.length === 6) {
        // Perhaps a pattern subpage
        for (let sub of ['options', 'measurements', 'needs', 'fabric', 'cutting', 'instructions']) {
          if(chunks[4] === 'options') return translate('app.patternOptions')
          if(chunks[4] === 'measurements') return translate('app.requiredMeasurements')
          if(chunks[4] === 'needs') return translate('app.whatYouNeed')
          if(chunks[4] === 'fabric') return translate('app.fabricOptions')
          if(chunks[4] === 'cutting') return translate('app.cutting')
          if(chunks[4] === 'instructions') return translate('app.instructions')
        }
      }
    }
  }
  if (typeof page.frontmatter.linktitle !== "undefined") return page.frontmatter.linktitle
  if (typeof page.frontmatter.title !== "undefined") return page.frontmatter.title

  return slug
}

const getTitles = mdxPages => {
  let titles = {}
  for (let slug in mdxPages) titles[slug] = pageTitle(slug, mdxPages[slug])
  for (let pattern of patterns) titles[`/docs/patterns/${pattern}/`] = translate(`patterns.${pattern}.title`)

  return titles
}

module.exports = {
  translate,
  pageTitle,
  getTitles,
  capitalize
}


