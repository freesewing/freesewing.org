const slugToChunks = (slug) => {
  if (slug[0] === '/') slug = slug.slice(1)
  if (slug.slice(-1) === '/') slug = slug.slice(0, -1)

  return slug.split('/')
}

const getBase = (chunks) => '/' + chunks.slice(0, 2).join('/') + '/'

export const getChildren = (slug, tree) => {
  let chunks = slugToChunks(slug)
  let base = getBase(chunks)
  try {
    if (chunks.length === 2) return tree[base].children
    if (chunks.length === 3) return tree[base].children['/' + chunks.join('/') + '/'].children
    if (chunks.length === 4)
      return tree[base].children['/' + chunks.slice(0, 3).join('/') + '/'].children[
        '/' + chunks.join('/') + '/'
      ].children
    if (chunks.length === 5)
      return tree[base].children['/' + chunks.slice(0, 3).join('/') + '/'].children[
        '/' + chunks.slice(0, 4).join('/') + '/'
      ].children['/' + chunks.join('/') + '/'].children
  } catch (err) {
    // Avoid SSR noise when building site
    if (typeof window !== 'undefined') console.log('Could not get children', { err, chunks, slug })
  }

  return {}
}

export const getSiblings = (slug, tree) => {
  let chunks = slugToChunks(slug)
  let base = getBase(chunks)
  try {
    if (chunks.length === 2) return tree
    if (chunks.length === 3) return tree[base].children
    if (chunks.length === 4)
      return tree[base].children['/' + chunks.slice(0, 3).join('/') + '/'].children
    if (chunks.length === 5)
      return tree[base].children['/' + chunks.slice(0, 3).join('/') + '/'].children[
        '/' + chunks.slice(0, 4).join('/') + '/'
      ].children
  } catch (err) {
    // Avoid SSR noise when building site
    if (typeof window !== 'undefined') console.log('Could not get siblings', { err, chunks, slug })
  }

  return {}
}

export const getParents = (slug, tree) => {
  let chunks = slugToChunks(slug)
  let base = getBase(chunks)
  try {
    if (chunks.length === 3) return tree
    if (chunks.length === 4) return tree[base].children
    if (chunks.length === 5)
      return tree[base].children[`/` + chunks.slice(0, 3).join('/') + '/'].children
    if (chunks.length === 6)
      return tree[base].children[`/` + chunks.slice(0, 3).join('/') + '/'].children[
        `/` + chunks.slice(0, 4).join('/') + '/'
      ]
  } catch (err) {
    // Avoid SSR noise when building site
    if (typeof window !== 'undefined') console.log('Could not get parents', { err, chunks, slug })
  }

  return {}
}
