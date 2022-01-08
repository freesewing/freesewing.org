import React from 'react'
import Icon from '@freesewing/components/Icon'
import { Link } from 'gatsby'

const Person = (props) => {
  // SSR
  if (!props.data) return null

  let classes = ''
  if (!props.data.breasts) classes += 'no-'
  classes += 'breasts person shadow'
  if (props.fullWidth) classes += ' full-width'

  return (
    <div className={classes}>
      <div className="top">
        <h5>{props.data.name}</h5>
      </div>
      <div className="bottom">
        <ul>
          <li>
            <Icon icon="units" /> {props.translate(`app.${props.data.units}Units`)}
          </li>
          <li>
            <Icon icon="measurements" />{' '}
            {props.data.measurements ? Object.keys(props.data.measurements).length : 0}{' '}
            {props.translate('app.measurements')}
          </li>
          <li>
            <Icon icon={props.data.breasts ? 'withBreasts' : 'withoutBreasts'} />
            {props.translate(props.data.breasts ? 'app.withBreasts' : 'app.withoutBreasts')}
          </li>
        </ul>
      </div>
      <div className="avatar">
        <img
          src={
            props?.data?.pictureUris ? props?.data?.pictureUris?.m : 'https://freesewing.org/avatar.svg'
          }
        />
      </div>
      {props.link && <Link to={props.link} className="link" />}
    </div>
  )
}

export default React.memo(Person)
