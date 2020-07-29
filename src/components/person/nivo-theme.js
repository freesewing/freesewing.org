const nivoTheme = (dark = false) => ({
  fontFamily: 'Roboto condensed',
  fontSize: 11,
  textColor: 'currentColor',
  axis: {
    ticks: {
      line: {
        stroke: 'currentColor',
        strokeWidth: 1,
        strokeOpacity: 0.6
      }
    },
    legend: {
      text: {
        fontSize: 12
      }
    }
  },
  grid: {
    line: {
      stroke: 'currentColor',
      strokeWidth: 1,
      strokeOpacity: 0.3
    }
  },
  legends: {
    text: {
      fill: 'currentColor',
      fillOpacity: 0.7
    }
  },
  markers: {
    lineColor: 'currentColor',
    lineStrokeWidth: 1
  },
  tooltip: {
    container: {
      background: dark ? 'black' : 'white',
      color: 'currentColor',
      fontSize: 'inherit',
      borderRadius: '2px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
      padding: '5px 9px'
    },
    basic: {
      whiteSpace: 'pre',
      display: 'flex',
      alignItems: 'center'
    },
    table: {},
    tableCell: {
      padding: '3px 5px'
    }
  },
  crosshair: {
    line: {
      stroke: 'currentColor',
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: '6 6'
    }
  },
  annotations: {
    text: {
      fontSize: 13,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    link: {
      stroke: 'currentColor',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    outline: {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    symbol: {
      fill: 'currentColor',
      outlineWidth: 2,
      outlineColor: '#ffffff'
    }
  }
})

export default nivoTheme
