import React, { useEffect } from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import Blockquote from '@freesewing/components/Blockquote'
import MeasurementsImages from '../measurements/images'
import DocsIndexPage from '../docs/'
import PatternPage from '../docs/pattern'
import { list as patterns, options } from '@freesewing/pattern-info'
import { Link } from 'gatsby'
import PatternOptions from '../docs/pattern-options'
import PatternMeasurements from '../docs/pattern-measurements'
import { measurements } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'

const DocumentationPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(noTitle ? noTitle : props.pageContext.node.frontmatter.title)
    props.app.frontend.setDescription(props.pageContext.node.excerpt)
  }, [props.slug])
  if (props.slug === '/docs') return <DocsIndexPage {...props} />
  const components = {
    Note: ({ children }) => {
      return <Blockquote type="note">{children}</Blockquote>
    },
    Tip: ({ children }) => {
      return <Blockquote type="tip">{children}</Blockquote>
    },
    Warning: ({ children }) => {
      return <Blockquote type="warning">{children}</Blockquote>
    }
  }
  const realMeasurementName = m => {
    for (let measurement of measurements.womenswear) {
      if (measurement.toLowerCase() === m) return measurement
    }
    return m
  }

  let noTitle = false; // For when title is not from markdown frontmatter
  let prefix = null
  let suffix = null
  if (props.slug === '/docs/measurements') {
    let children = []
    for (let m of measurements.womenswear) {
      children.push(
        <li key={m}>
          <Link to={'/docs/measurements/' + m.toLowerCase()}>
            <FormattedMessage id={'measurements.' + m} />
          </Link>
        </li>
      )
    }
    prefix = <ul>{children}</ul>
  }

  // Add measurements images when needed
  const chunks = props.slug.split('/')
  if (chunks.length === 4 && chunks[1] === 'docs' && chunks[2] === 'measurements')
    prefix = <MeasurementsImages measurement={realMeasurementName(chunks[3])} />
  else if (props.slug === '/docs/patterns')
    suffix = (
      <ul className="links">
        {patterns.map(pattern => (
          <li key={pattern}>
            <Link to={'/docs/patterns/' + pattern}>
              <FormattedMessage id={`patterns.${pattern}.title`} />
          </Link>
          </li>
        ))}
      </ul>
    )
  else if (chunks.length === 4 && chunks[1] === 'docs' && chunks[2] === 'patterns') {
    suffix = <PatternPage pattern={chunks[3]} {...props} />
    noTitle = props.app.frontend.intl.formatMessage({id:`patterns.${chunks[3]}.title`})
  }
  else if (
    chunks.length === 5 &&
    chunks[1] === 'docs' &&
    chunks[2] === 'patterns'
  ) {
    if (chunks[4] === 'options') {
      prefix = <PatternOptions pattern={chunks[3]} />
      noTitle = props.app.frontend.intl.formatMessage({id:'app.patternOptions'})
    }
    else if (chunks[4] === 'measurements') {
      noTitle = props.app.frontend.intl.formatMessage({id:'app.requiredMeasurements'})
      suffix = <PatternMeasurements pattern={chunks[3]} app={props.app} />
    }
    else if (chunks[4] === 'needs') noTitle = props.app.frontend.intl.formatMessage({id:'app.whatYouNeed'})
    else if (chunks[4] === 'instructions') noTitle = props.app.frontend.intl.formatMessage({id:'app.instructions'})
    else if (chunks[4] === 'fabric') noTitle = props.app.frontend.intl.formatMessage({id:'app.fabricOptions'})
    else if (chunks[4] === 'cutting') noTitle = props.app.frontend.intl.formatMessage({id:'app.cutting'})
  }
  else if (
    chunks.length === 6 &&
    chunks[1] === 'docs' &&
    chunks[2] === 'patterns' &&
    chunks[4] === 'options'
  ) {
    for (let option of options[chunks[3]]) {
      if (option.toLowerCase() === chunks[5]) noTitle = props.app.frontend.intl.formatMessage({id:`options.${chunks[3]}.${option}.title`})
    }
  }

  return (
    <React.Fragment>
      {prefix}
      {props.pageContext.node.code ? (
        <section data-test="mdx">
          <MDXProvider components={components}>
            <MDXRenderer>{props.pageContext.node.code.body}</MDXRenderer>
          </MDXProvider>
        </section>
      ) : null}
      {suffix}
    </React.Fragment>
  )
}

export default DocumentationPage
