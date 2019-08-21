import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { list } from '@freesewing/pattern-info'
import LineDrawing from "@freesewing/components/LineDrawing"
import capitalize from "@freesewing/utils/capitalize";

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
    pattern: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    notes: {
      wordWrap: 'anywhere',
      margin: 0,
      padding: 0
    },
    linedrawing: {
      marginRight: "1rem",
    }
  }
  const pageTitle = (
    <FormattedMessage
      id="app.newPattern"
      values={{ pattern: props.app.frontend.intl.formatMessage({ id: 'app.pattern' }) }}
    />
  )

  return (
    <React.Fragment>
      {list.map(pattern => {
        return (
          <div className="box" key={pattern}>
            <Link to={'/create/' + pattern} title={pageTitle}>
              <div style={styles.pattern}>
                <div style={styles.linedrawing}>
                  <LineDrawing pattern={pattern} size={props.app.frontend.mobile ? 92 : 164} />
                </div>
                <div>
                  <h6 style={styles.name}>{capitalize(pattern)}</h6>
                  <p style={styles.notes}><FormattedMessage id={'patterns.' + pattern + '.title'} /></p>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default SelectPatternPage
