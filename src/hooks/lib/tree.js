import orderBy from 'lodash.orderby'

function getNextFromList(branch, key) {
  let next = false
  let current = false
  for (let page of order(branch)) {
    if (current) next = page
    current = page.key === key ? true : false
  }

  return next
}

function getPrevFromList(branch, key) {
  let prev = false
  for (let page of order(branch)) {
    if (page.key === key) return prev
    prev = page
  }

  return prev
}

function getCurrentFromList(branch, key) {
  for (let page of order(branch)) {
    if (page.key === key) return page
  }

  return false
}

function getFirstOffspring(slug, tree) {
  let chunks = slug.split('/').slice(1, -1)
  if (!tree.offspring) return false
  for (let i = 0; i < chunks.length; i++) {
    if (!tree || !tree.offspring) return false
    tree = tree.offspring[chunks[i]]
  }
  if (!tree || !tree.offspring) return false

  return order(tree.offspring)[0]
}

function getPrevSibling(slug, tree) {
  let chunks = slug.split('/').slice(1, -1)
  for (let i = 0; i < chunks.length - 1; i++) {
    if (!tree || !tree.offspring) return false
    tree = tree.offspring[chunks[i]]
  }
  if (!tree || !tree.offspring) return false

  return getPrevFromList(tree.offspring, chunks.pop())
}

function getNextSibling(slug, tree) {
  let chunks = slug.split('/').slice(1, -1)
  for (let i = 0; i < chunks.length - 1; i++) {
    if (!tree || !tree.offspring) return false
    tree = tree.offspring[chunks[i]]
  }
  if (!tree || !tree.offspring) return false

  return getNextFromList(tree.offspring, chunks.pop())
}

function getNextParent(slug, tree) {
  let chunks = slug.split('/').slice(1, -1)
  let branch = { ...tree }
  for (let i = 0; i < chunks.length - 1; i++) {
    if (!branch || !branch.offspring) return false
    branch = branch.offspring[chunks[i]]
  }
  let next = getNextFromList(branch.offspring, chunks.pop())
  if (next) return next
  // FIXME: This hardcodes the last page, not great.
  if (chunks.length > 1 || chunks[0] !== 'showcase')
    return getNextParent('/' + chunks.join('/') + '/', tree)
  return false
}

function getParent(slug, tree) {
  let chunks = slug.split('/').slice(1, -2)
  let branch = { ...tree }
  for (let i = 0; i < chunks.length - 1; i++) {
    if (!branch || !branch.offspring) return false
    branch = branch.offspring[chunks[i]]
  }
  if (!branch || !branch.offspring) return false

  return getCurrentFromList(branch.offspring, chunks.pop())
}

function trimTree(slug, tree) {
  let chunks = slug.split('/').slice(1, -1)
  for (let i = 0; i < chunks.length - 1; i++) tree = tree.offspring[chunks[i]]

  return tree
}

function getSelf(slug, tree) {
  let page = trimTree(slug, tree)

  return page && page.offspring ? page.offspring[slug.split('/').slice(1, -1).pop()] : false
}

function order(pages) {
  if (!pages) return []
  let tmp = {}
  for (let key of Object.keys(pages))
    tmp[key] = {
      ...pages[key],
      ordertitle: pages[key].ordertitle + pages[key].title,
      key
    }
  return orderBy(tmp, ['ordertitle'])
}

export default {
  order,
  getSelf,
  getFirstOffspring,
  getNextSibling,
  getNextParent,
  getPrevSibling,
  getParent
}
