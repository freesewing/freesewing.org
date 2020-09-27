import React from 'react'
import BreadCrumbs from './breadcrumbs'

// Auto-create breadcrumbs from navigation
const NavCrumbs = ({ slug, app }) => {
  const chunks = []
  for (const chunk of slug.split('/')) {
    if (chunk.length > 0) chunks.push(chunk)
  }

  const crumbs = []
  while (chunks.length > 1) {
    chunks.pop()
    let slug = '/' + chunks.join('/') + '/'
    crumbs.push({
      slug,
      title: app.pages[slug].title
    })
  }
  return <BreadCrumbs crumbs={crumbs.reverse()} app={app} pageTitle={app.pages[slug].title} />
}

export default NavCrumbs
