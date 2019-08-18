import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import Filter from './filter'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

const PatternList = props => {
  const [patterns, setPatterns] = useState(list)
  const [filter, setFilter] = useState(false)
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.patterns" />)
  }, [])

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    pattern: {
      width: '31%',
      textAlign: 'center',
      marginBottom: '4rem'
    },
    link: {
      color: 'inherit'
    },
    img: {
      borderRadius: '4px'
    }
  }
  if (props.app.frontend.mobile) styles.pattern.width = '48%'
  return (
    <React.Fragment>
      {filter ? (
        <Filter app={props.app} applyFilter={setPatterns} closeFilter={() => setFilter(false)} />
      ) : (
        <p style={{ textAlign: 'right' }}>
          <Button onClick={() => setFilter(!filter)} variant="outlined">
            <SearchIcon style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="filter.filter" />
          </Button>
        </p>
      )}
      <div style={styles.wrapper}>
        {patterns.map(pattern => {
          return (
            <div key={pattern} style={styles.pattern} data-test={pattern}>
              <Link to={'/patterns/' + pattern} style={styles.link}>
                <img
                  src={'/patterns/' + pattern + '.jpg'}
                  alt={pattern}
                  className="shadow"
                  style={styles.img}
                />
                <h5>{capitalize(pattern)}</h5>
                <FormattedMessage id={'patterns.' + pattern + '.description'} />
              </Link>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default PatternList
