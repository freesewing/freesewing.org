import React from 'react'

const rotation = (val) => val * 20
const color = (val, theme) => {
  if (val === 6 || val === -6) return theme === 'dark' ? '#ffa94d' : '#fd7e14'
  if (val < 2 && val > -2) return theme === 'dark' ? '#69db7c' : '#40c057'
  if (val < 4 && val > -4) return theme === 'dark' ? '#a9e34b' : '#82c91e'
  return theme === 'dark' ? '#ffd43b' : '#fab005'
}

const MeasurementGauge = ({ val = 0, size = 24, theme = 'light' }) => {
  let disabled = val === null ? true : false
  if (!disabled) {
    // Keep it between 6 and minus 6
    if (val > 6) val = 6
    else if (val < -6) val = -6
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 100 100">
      <path
        style={{
          stroke: 'currentColor',
          fill: 'none',
          strokeWidth: 10,
          strokeLinecap: 'round',
          opacity: disabled ? 0.5 : 1,
        }}
        d="M 19.159342,80.843971 A 43.615262,43.615112 1.4410981 0 1 9.7047547,33.312642 43.615262,43.615112 1.4410981 0 1 50.000012,6.3883293 43.615262,43.615112 1.4410981 0 1 90.295254,33.312678 43.615262,43.615112 1.4410981 0 1 80.840639,80.843997"
      />
      <path
        style={{
          stroke: 'currentColor',
          fill: 'none',
          strokeWidth: 5,
          strokeLinecap: 'round',
          opacity: disabled ? 0 : 1,
        }}
        d="M 50 5 l 0 15"
      />
      {!disabled && (
        <path
          style={{
            fill: color(val, theme),
            strokeWidth: 5,
            stroke: theme === 'dark' ? '#212529' : '#f8f9fa',
          }}
          d="m 50.071405,-3.7900344 c -0.688279,-0.037659 -1.291779,0.4884225 -1.402398,1.2207391 L 36.141675,43.652729 A 14.62379,15.743531 0 0 0 35.37621,48.674055 14.62379,15.743531 0 0 0 50,64.417586 14.62379,15.743531 0 0 0 64.62379,48.674055 14.62379,15.743531 0 0 0 63.884032,43.738827 14.62379,15.743531 0 0 0 63.87548,43.708082 L 51.333849,-2.5692953 c -0.102033,-0.6759312 -0.627246,-1.1844016 -1.262444,-1.2207391 z"
          transform={`rotate(${rotation(val)},50,50)`}
        />
      )}
    </svg>
  )
}

export default MeasurementGauge
