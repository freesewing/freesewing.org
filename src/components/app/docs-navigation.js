import React from 'react'
import TableOfContents from '../TableOfContents'
import ExpandedIcon from '@material-ui/icons/KeyboardArrowDown'
import CollapsedIcon from '@material-ui/icons/KeyboardArrowRight'
import { Link } from 'gatsby'
import useNavigation from '../../hooks/useNavigation'

const Navigation = ({ app, slug, toc = null }) => {
  const { titles, tree } = useNavigation(app)

  const isDescendant = (checkSlug, baseSlug) => {
    if (checkSlug.slice(-1) !== '/') checkSlug += '/'
    if (baseSlug.slice(-1) !== '/') baseSlug += '/'
    if (baseSlug.slice(0, 1) !== '/') baseSlug = '/' + baseSlug
    if (checkSlug.slice(0, baseSlug.length) === baseSlug) return true
    return false
  }

  const styles = {
    icon: {
      fontSize: '16px',
      maxWidth: '16px'
    }
  }

  const renderSidebar = () => {
    let items = []
    for (let topic in tree) {
      let active = isDescendant(slug, topic) ? true : false
      items.push(
        <li key={topic} className={active ? 'topic active' : 'topic'}>
          <Link className={active ? 'topic active' : 'topic'} to={topic}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}

            {titles[topic]}
          </Link>
          {active ? renderSidebarLevel(1, tree[topic].children) : null}
        </li>
      )
    }

    return <ul className="topics">{items}</ul>
  }

  const renderSidebarLevel = (level, data) => {
    // Don't bother if there's nothing to render
    if (Object.keys(data).length === 0) return null
    // Avoid too much recursion
    if (level > 4) return null
    let children = []
    for (let key in data) {
      let grandchildren = null
      let active = isDescendant(slug, key) ? true : false
      let current = slug === key ? true : false
      if (active && typeof data[key].children !== 'undefined') {
        grandchildren = renderSidebarLevel(level + 1, data[key].children)
      }
      let className = active ? 'active' : 'inactive'
      children.push(
        <li key={key} className={className}>
          <Link className={className} to={key}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}
            {titles[key]}
          </Link>
          {current ? <TableOfContents toc={toc} slug={key} /> : null}
          {grandchildren}
        </li>
      )
    }

    return <ul className={'topic-links level-' + level}>{children}</ul>
  }

  return renderSidebar()
}

export default Navigation
