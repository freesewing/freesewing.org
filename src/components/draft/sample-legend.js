import React from 'react'
import { jsxSampleStyles, jsxFocusStyle, extraDefs } from './sample-styles'
import convertSize from '@freesewing/utils/convertSize'
import Icon from '@freesewing/components/Icon'

const SampleLegend = (props) => {
  const textStyle = {
    fontFamily: 'Roboto condensed',
    fontSize: '18px',
    fontWeight: 'bold',
    fill: 'currentColor',
    textAlign: 'center',
    textAnchor: 'middle'
  }
  const lineStyles = jsxSampleStyles(props.dark)
  let i = -1

  return (
    <svg viewBox="-5 -10 450 82.5">
      <defs>{extraDefs(props.dark)}</defs>
      <g>
        {Object.keys(props.sizes).map((size) => {
          i++
          return (
            <g transform={`translate(${i * 45} 0)`}>
              <g transform="translate(6 9)">
                <Icon icon={props.breasts ? 'withBreasts' : 'withoutBreasts'} size={24} />
              </g>
              <rect x="0" y="5" width="35" height="50" style={lineStyles[i]} />
              <text x="17.5" y="50" style={textStyle}>
                {convertSize(size.slice(4), props.breasts)}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default SampleLegend
