import React from 'react'
import useApp from '../hooks/useApp'
import useNavigation from '../hooks/useNavigation'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import { getChildren } from '../utils'

// FIXME: This only handles pages 2, 3, or 4 levels deep

const ReadMore = ({ root, recurse = false, link = false, box = false }) => {
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  //  const getChildren = root => {
  //    let chunks = root.split('/')
  //    if (chunks[0] === '') chunks.splice(0, 1)
  //    if (chunks[-1] === '') chunks.splice(-1, 1)
  //    if (chunks.length === 2) return tree[`/` + chunks.join('/') + '/'].children
  //    if (chunks.length === 3)
  //      return tree[`/` + chunks.slice(0, 2).join('/') + '/'].children['/' + chunks.join('/') + '/']
  //        .children
  //    if (chunks.length === 4)
  //      return tree[`/` + chunks.slice(0, 2).join('/') + '/'].children[
  //        '/' + chunks.slice(0, 3).join('/') + '/'
  //      ].children['/' + chunks.join('/') + '/'].children
  //
  //    return {}
  //  }

  const renderDocs = root => {
    let children = getChildren(root, tree)
    let links = []
    for (let slug in children) links.push(renderDocsLevel(slug, children[slug]))

    return <ul className="links">{links}</ul>
  }

  const renderDocsLevel = (slug, level) => {
    let links = []
    if (level.children && Object.keys(level.children).length > 0 && recurse) {
      for (let slug in level.children) links.push(renderDocsLevel(slug, level.children[slug]))
    }
    if (links.length > 0) links = <ul className="links">{links}</ul>
    let url = null
    if (link) url = <span style={styles.url}>{slug}</span>

    return (
      <li>
        <Link to={slug}>
          {titles[slug]}
          {url}
        </Link>
        {links}
      </li>
    )
  }

  const styles = {
    url: {
      display: 'block',
      margin: '0 0 0.25rem 1rem',
      fontSize: '0.9rem',
      color: app.theme === 'dark' ? 'white' : 'black'
    }
  }

  if (box)
    return (
      <Blockquote type="note">
        <h5>
          <FormattedMessage id="app.furtherReading" />
        </h5>
        {renderDocs(root)}
      </Blockquote>
    )
  else return renderDocs(root)
}

export default ReadMore
