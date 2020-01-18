import React from 'react'
import Markdown from 'react-markdown'

const PatternNotes = ({ notes, app }) => {
  const light = app.theme === 'light' ? true : false
  const style = {
    wrapper: {
      border: '2px solid ' + (light ? '#212529' : '#f8f9fa'),
      borderRadius: '4px',
      padding: '1rem',
      position: 'relative',
      background: light ? '#fff' : '#1c1c1c'
    },
    label: {
      borderTop: '2px dashed ' + (light ? '#212529' : '#f8f9fa'),
      display: 'block',
      position: 'absolute',
      top: 0,
      right: '20px',
      color: light ? '#f8f9fa' : '#212529',
      padding: '1px 8px',
      borderBottomRightRadius: '3px',
      borderBottomLeftRadius: '3px',
      fontWeight: 'bold',
      textShadow: 'none',
      background: light ? '#212529' : '#f8f9fa',
      fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
      lineHeight: '1.5'
    }
  }

  return (
    <div style={style.wrapper} className="shadow">
      <span style={style.label}>{app.translate('app.notes')}</span>
      <Markdown source={notes} />
    </div>
  )
}

export default PatternNotes
