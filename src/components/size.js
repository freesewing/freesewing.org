import React from 'react'
import './size.scss'
import Icon from '@freesewing/components/Icon'
import { Link } from 'gatsby'
import formatMm from '@freesewing/utils/formatMm'
import convertSize from '@freesewing/utils/convertSize'

const Size = (props) => (
  <div className={`size ${props.breasts ? 'breasts' : 'no-breasts'}`}>
    <div className="top">
      <h5>
        <Icon icon={props.breasts ? 'withBreasts' : 'withoutBreasts'} size={52} />
        <span className="prefix">{props.translate('app.size')}</span>
        <span className="size">{convertSize(props.size, props.breasts)}</span>
      </h5>
    </div>
    <div className="bottom">
      {props.translate('measurements.neckCircumference')}
      <br />
      <span className="val">{props.size}cm</span>
      |
      <span
        className="val"
        dangerouslySetInnerHTML={{
          __html: '<b>' + formatMm(props.size * 10, 'imperial', 'html') + '</b>'
        }}
      />
    </div>
    <Link to={props.link} className="link" />
  </div>
)

export default React.memo(Size)
