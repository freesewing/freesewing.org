import React from 'react'
import ContentWrapper from '../wrappers/content'
import BreadCrumbs from '../breadcrumbs'

const WideLayout = ({ app, children, top = false, noTitle = false }) => {
  const style = {
    padding: app.tablet ? '0 1rem' : '0 2rem',
    minHeight: noTitle ? undefined : 'calc(100vh - 6rem)',
    maxWidth: '1600px',
    width: app.tablet ? 'calc(100% - 2rem)' : 'calc(100% - 4rem)',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: top ? 'top' : 'center'
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
