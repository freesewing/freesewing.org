import React from 'react'

const ContentWrapper = ({ children }) => {
  const style = {
    padding: '1rem',
  }

  return <div style={style}>{children}</div>
}

export default ContentWrapper
