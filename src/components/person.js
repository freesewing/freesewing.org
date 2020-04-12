import React from 'react'
import './person.scss'
import Icon from '@freesewing/components/Icon'
import { Link } from 'gatsby'

const Person = (props) => (
  <div className="person">
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
      <img src={props.data.pictureUris.m} />
    </div>
    <Link to={props.link} className="link" />
  </div>
)

export default React.memo(Person)
