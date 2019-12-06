const crumbsFromNavigation = (path, navigation, titles) => {
  if (path.slice(-1) === '/') path = path.slice(0, -1)
  let crumbs = []
  let chunks = path.split('/')
  while (chunks.length > 2) {
    chunks.pop()
    let slug = chunks.join('/')
    crumbs.push({
      slug,
      title:
        titles[slug] ||
        titles[slug + '/'] ||
        (typeof navigation[slug + '/'] !== 'undefined'
          ? navigation[slug + '/'].title
          : chunks.splice(-1))
    })
  }
  return crumbs.reverse()
}

export default crumbsFromNavigation
