import React from 'react'
import { Link } from 'gatsby'
import orderBy from 'lodash.orderby'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'
import AccountIcon from '@material-ui/icons/Face'
import LoginIcon from '@material-ui/icons/VpnKey'
import Icon from '@freesewing/components/Icon'

const icons = {
  designs: <Icon icon="withBreasts" />,
  showcase: <ShowcaseIcon />,
  blog: <BlogIcon />,
  docs: <DocsIcon />,
  community: <CommunityIcon />,
  account: <AccountIcon />,
  login: <LoginIcon />
}

const onPath = (slug, chunks) => {
  if (!slug) return false
  let compare = slug.split('/').slice(1, -1)
  let match = true
  for (let i in compare) {
    if (compare[i] !== chunks[i]) match = false
  }

  return match
}
const getSiblings = (slug, tree, chunks, level = 1) => {
  if (level > 4) return []
  let steps = chunks.slice(0, level)
  let siblings = []
  let branch = { ...tree }
  for (let step of steps) branch = branch.offspring[step]
  if (!branch.offspring) return []
  let tmp = {}
  for (let key of Object.keys(branch.offspring)) {
    tmp[key] = {
      ...branch.offspring[key],
      key
    }
    if (typeof tmp[key].ordertitle === 'undefined')
      tmp[key].ordertitle = branch.offspring[key].order + branch.offspring[key].title
  }
  let subnav
  let ordered = orderBy(tmp, ['ordertitle'])
  if (['blog', 'showcase'].indexOf(chunks[0]) !== -1) ordered.reverse()
  for (let page of ordered) {
    if (onPath(page.slug, chunks))
      subnav = <Submenu slug={slug} chunks={chunks} tree={tree} level={level + 1} />
    else subnav = null
    siblings.push(
      <li key={page.slug}>
        <Link to={page.slug} className={slug === page.slug ? 'active' : ''}>
          {page.title}
        </Link>
        {subnav}
      </li>
    )
  }

  return siblings
}
const Submenu = ({ slug, chunks, tree, level = 1 }) => (
  <ul className={`level-${level}`}>{getSiblings(slug, tree, chunks, level)}</ul>
)

const MainMenu = ({ app, slug = '/fixme/' }) => {
  const chunks = slug.split('/').slice(1, -1)
  const links = {
    designs: app.translate('app.designs'),
    community: app.translate('cty.community'),
    showcase: app.translate('app.showcase'),
    blog: app.translate('app.blog'),
    docs: app.translate('app.docs')
  }
  let order = {}
  for (let key in links) order[links[key]] = key
  let keyOrder = Object.keys(order)
  keyOrder.sort()
  // Keep these at the top regardless of order
  order[app.translate('app.account')] = 'account'
  order[app.translate('app.logIn')] = 'login'
  links.account = app.translate('app.account')
  links.login = app.translate('app.logIn')
  if (app.account.username) keyOrder.unshift(app.translate('app.account'))
  else keyOrder.unshift(app.translate('app.logIn'))
  console.log(keyOrder, app.account.username)

  return (
    <>
      <ul className="aside-main-menu" id="main-menu">
        {keyOrder.map((title) => {
          let link = order[title]
          return (
            <li key={link}>
              <Link
                to={`/${link}/`}
                className={link === chunks[0] ? 'active' : ''}
                title={links[link]}
              >
                {icons[link]}
                <span className="text">{links[link]}</span>
              </Link>
              {link === chunks[0] && <Submenu slug={slug} chunks={chunks} tree={app.tree} />}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MainMenu
