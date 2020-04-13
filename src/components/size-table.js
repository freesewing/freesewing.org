import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  measurements as allMeasurements,
  sizes as allSizes,
  withBreasts,
  withoutBreasts
} from '@freesewing/models'
import formatMm from '@freesewing/utils/formatMm'
import Icon from '@freesewing/components/Icon'
import convertSize from '@freesewing/utils/convertSize'

const SizeTable = (props) => {
  const sizes = props.breasts ? allSizes.womenswear : allSizes.menswear
  const measurements = props.breasts ? allMeasurements.womenswear : allMeasurements.menswear
  const data = props.breasts ? withBreasts : withoutBreasts

  const style = {
    wrapper: {
      overflowX: 'auto',
      marginBottom: '1rem'
    },
    th: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }

  const icon = <Icon icon={props.breasts ? 'withBreasts' : 'withoutBreasts'} />
  return [
    <div style={style.wrapper}>
      <table className={'data ' + (props.breasts ? 'with-breasts' : 'without-breasts')}>
        <thead>
          <tr>
            <th>{icon}</th>
            {sizes.map((size) => (
              <th key={size}>
                <div style={style.th}>
                  {icon} {convertSize(size, props.breasts)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measurements.map((m) => (
            <tr className={m.toLowerCase()} key={m}>
              <td>
                <FormattedMessage id={`measurements.${m}`} />
              </td>
              {sizes.map((s) => {
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
