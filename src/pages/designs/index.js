import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import Filter from '../../components/designs/filter'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Page = (props) => {
  const app = useApp(false)

  const [designs, setDesigns] = useState(list)
  const [filter, setFilter] = useState(false)

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    innerWrapper: {
      padding: '10px',
      maxWidth: '200px',
    },
    image: {
      borderRadius: '4px',
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }

  return (
    <AppWrapper app={app} title={app.translate('app.designs')} slug={props.path} wide>
      {filter ? (
        <Filter app={app} applyFilter={setDesigns} closeFilter={() => setFilter(false)} />
      ) : (
        <p style={{ textAlign: 'right' }}>
          <Button onClick={() => setFilter(!filter)} variant="outlined">
            <SearchIcon style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="filter.filter" />
          </Button>
        </p>
      )}
      <div style={style.wrapper}>
        {designs.map((design) => (
          <div style={style.innerWrapper}>
            <Link to={'/designs/' + design + '/'} title={capitalize(design)} style={style.link}>
              <figure style={{ margin: 0 }}>
                <img
                  src={`/designs/${design}.jpg`}
                  alt={capitalize(design)}
                  style={style.image}
                  className="shadow"
                />
              </figure>
              <h5 style={{ margin: 0, lineHeight: '1.25' }}>
                {app.translate('patterns.' + design + '.title')}
              </h5>
              <span>{app.translate('patterns.' + design + '.description')}</span>
            </Link>
          </div>
        ))}
      </div>
    </AppWrapper>
  )
}

export default Page
