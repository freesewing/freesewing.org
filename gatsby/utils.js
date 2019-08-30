const i18n = require("@freesewing/i18n").strings
const capitalize = require("@freesewing/utils/capitalize")

const  translate = key => i18n[process.env.GATSBY_LANGUAGE][key] || key

const pageTitle = (slug, page) => {
  if (typeof page.frontmatter.linktitle !== "undefined") return page.frontmatter.linktitle
  if (typeof page.frontmatter.title !== "undefined") return page.frontmatter.title
  else return slug
}

const getTitles = mdxPages => {
    let titles = {}
  for (let slug in mdxPages) titles[slug] = pageTitle(slug, mdxPages[slug])
  return titles
}


module.exports = {
  translate,
  pageTitle,
  getTitles,
  capitalize
}


