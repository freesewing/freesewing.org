import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import useNavigation from '../../hooks/useNavigation'

const DocsMenu = ({ app }) => {
  const { tree, titles } = useNavigation(app)

  const style = {
    wrapper: {
      padding: '0 1rem',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '600px'
    },
    col: {
      padding: '0 0.5rem'
    },
    patterns: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    pattern: {
      padding: '0 0.5rem 0 0',
      display: 'inline-block'
    },
    link: {
      textDecoration: 'none',
      color: app.theme === 'dark' ? '#74c0fc' : '#228be6'
    }
  }

  const renderDocs = branch => {
    let list = []
    let links = {}
    for (let slug of Object.keys(branch.children)) links[titles[slug]] = slug
    for (let title of Object.keys(links).sort()) {
      let slug = links[title]
      list.push(
        <li key={slug} style={style.pattern}>
          <Link to={slug}>{title}</Link>
        </li>
      )
    }
    return <ul style={style.patterns}>{list}</ul>
  }

  return (
    <div style={style.wrapper} className={`style-wrapper ${app.theme}`}>
      <div style={style.col}>
        <h6>
          <Link to="/docs/about/">
            <FormattedMessage id="app.aboutFreesewing" />
          </Link>
        </h6>
        {renderDocs(tree['/docs/about/'])}
      </div>
      <div style={style.col}>
        <h6>
          <Link to="/docs/patterns">
            <FormattedMessage id="app.patternDocs" />
          </Link>
        </h6>
        {renderDocs(tree['/docs/patterns/'])}
      </div>
      <div style={style.col}>
        <h6>
          <FormattedMessage id="app.various" />
        </h6>
        <ul className="links">
          <li>
            <Link to="/docs/measurements/">{titles['/docs/measurements/']}</Link>
          </li>
          <li>
            <Link to="/docs/sewing/">{titles['/docs/sewing/']}</Link>
          </li>
          <li>
            <a href="https://freesewing.dev/">
              <FormattedMessage id="app.docsForContributors" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DocsMenu
