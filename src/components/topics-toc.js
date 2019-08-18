import React from 'react'
import TableOfContents from './TableOfContents'
import ExpandedIcon from '@material-ui/icons/KeyboardArrowDown'
import CollapsedIcon from '@material-ui/icons/KeyboardArrowRight'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'

const TopicsToc = props => {
  const topics = ['patterns', ...props.topics]
  const topicsToc = {
    patterns: {
      title: props.app.frontend.intl.formatMessage({ id: 'app.patterns' }),
      children: {}
    },
    ...props.topicsToc
  }
  for (let pattern of list)
    topicsToc.patterns.children['/patterns/' + pattern] = { title: capitalize(pattern) }

  const isDescendant = (checkSlug, baseSlug) => {
    if (checkSlug.slice(0, baseSlug.length) === baseSlug) return true
    return false
  }

  const styles = {
    icon: {
      fontSize: '16px'
    }
  }
  const renderSidebar = () => {
    let items = []
    for (let topic of topics) {
      let active = isDescendant(props.slug, '/' + topic) ? true : false
      items.push(
        <li key={topic} className={active ? 'topic active' : 'topic'}>
          <Link className={active ? 'topic active' : 'topic'} to={'/' + topic}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}

            <FormattedMessage id={'app.' + topic} />
          </Link>
          {active ? renderSidebarLevel(1, topicsToc[topic].children) : null}
        </li>
      )
    }

    return <ul className="topics">{items}</ul>
  }

  const renderSidebarLevel = (level, data) => {
    // Avoid too much recursion
    if (level > 4) return null
    // FIXME: This is a very hackish way to add a required measurements page per pattern
    // but it's because these pages don't exist in markdown
    if (level === 3) {
      let slug = Object.keys(data)[0];
      if (slug.slice(0,15) === "/docs/patterns/") {
        let chunks = slug.split("/");
        chunks.pop()
        data[chunks.join("/")+"/measurements"] = { title: props.app.frontend.intl.messages["app.requiredMeasurements"] };
      }
    }

    let children = []
    for (let key in data) {
      let grandchildren = null
      let active = isDescendant(props.slug, key) ? true : false
      let current = props.slug === key ? true : false
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
            {data[key].title}
          </Link>
          {current ? <TableOfContents toc={props.toc} slug={key} /> : null}
          {grandchildren}
        </li>
      )
    }

    return <ul className={'topic-links level-' + level}>{children}</ul>
  }

  return renderSidebar()
}

export default TopicsToc
