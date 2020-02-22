import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  measurements as allMeasurements,
  sizes as allSizes,
  withBreasts,
  withoutBreasts
} from '@freesewing/models'
import formatMm from '@freesewing/utils/formatMm'

const SizeTable = props => {
  const sizes = props.breasts ? allSizes.womenswear : allSizes.menswear
  const measurements = props.breasts ? allMeasurements.womenswear : allMeasurements.menswear
  const data = props.breasts ? withBreasts : withoutBreasts

  const style = {
    wrapper: {
      overflowX: 'auto'
    }
  }

  return [
    <div style={style.wrapper}>
      <table className={'data ' + (props.breasts ? 'with-breasts' : 'without-breasts')}>
        <thead>
          <tr>
            <th>
              <FormattedMessage id={props.breasts ? 'app.withBreasts' : 'app.withoutBreasts'} />
            </th>
            {sizes.map(size => (
              <th key={size}>{size}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measurements.map(m => (
            <tr className={m.toLowerCase()} key={m}>
              <td>
                <FormattedMessage id={`measurements.${m}`} />
              </td>
              {sizes.map(s => {
                let val = data[`size${s}`][m]
                return (
                  <td className={'size-' + s} key={s}>
                    {formatMm(val, 'metric')}
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: formatMm(val, 'imperial') }} />
                  </td>
                )
              })}
              <td>
                <FormattedMessage id={`measurements.${m}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ]
}

export default SizeTable
