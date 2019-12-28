import React from 'react'
import BreadCrumbs from '../breadcrumbs'

const WideLayout = ({ app, children, top = false, noTitle = false }) => {
  const style = {
    padding: '0 2rem',
    minHeight: noTitle ? undefined : 'calc(100vh - 6rem)',
    maxWidth: '1600px',
    width: 'calc(100% - 4rem)',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: top ? 'top' : 'center'
  }
  if (app.tablet || app.mobile) {
    style.padding = '0 1rem'
    style.width = 'calc(100% - 2rem)'
  }

  return (
    <div style={style}>
      {!noTitle && (
        <>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
          <h1>{app.title}</h1>
        </>
      )}
      {children}
    </div>
  )
}

export default WideLayout
