import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { list } from '@freesewing/pattern-info'

const SelectPatternPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.chooseAPattern" />)
    props.app.frontend.setCrumbs([
      {
        slug: '/create',
        title: (
          <FormattedMessage
            id="app.newPattern"
            values={{ pattern: props.app.frontend.intl.formatMessage({ id: 'app.pattern' }) }}
          />
        )
      }
    ])
  }, [])
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'start'
    },
    pattern: {
      margin: '0.5rem 0.5rem 0',
      width: 'calc(25% - 1rem)',
      textAlign: 'center'
    },
    name: {
      margin: 0,
      wordWrap: 'anywhere'
    }
  }
  if (props.app.frontend.tablet) styles.pattern.width = 'calc(33% - 1rem)'
  if (props.app.frontend.mobile) styles.pattern.width = 'calc(50% - 1rem)'
  const pageTitle = (
    <FormattedMessage
      id="app.newPattern"
      values={{ pattern: props.app.frontend.intl.formatMessage({ id: 'app.pattern' }) }}
    />
  )

  return (
    <div style={styles.wrapper}>
      {list.map(pattern => {
        return (
          <div style={styles.pattern} key={pattern}>
            <Link to={'/create/' + pattern} title={pageTitle}>
              <h5 style={styles.name}>{pattern}</h5>
              <FormattedMessage id={'patterns.' + pattern + '.title'} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SelectPatternPage
