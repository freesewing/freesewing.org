import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import Filter from '../../components/designs/filter'
import { Link } from 'gatsby'

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
      padding: app.mobile ? '4px' : app.tablet ? '6px' : '10px',
      maxWidth: app.mobile ? '160px' : app.tablet ? '180px' : '200px',
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
      <Filter app={app} applyFilter={setDesigns} />
      <div style={style.wrapper}>
        {designs.map((design) => (
          <div key={design} style={style.innerWrapper}>
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
