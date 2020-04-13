import React from 'react'
import BreadCrumbs from '../breadcrumbs'

const BaseLayout = ({
  app,
  children,
  style = {},
  top = false,
  noTitle = false,
  crumbsOnly = false,
  name = 'base'
}) => {
  const baseStyle = {
    margin: '0 auto',
    minHeight: noTitle ? undefined : 'calc(100vh - 6rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: top ? 'top' : 'center',
    padding: '1.5rem',
    width: 'calc(100% - 3rem)',
    ...style
  }

  return (
    <div style={baseStyle} dataLayout={name}>
      {(crumbsOnly || !noTitle) && (
        <>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
          {!crumbsOnly && <h1>{app.title}</h1>}
        </>
      )}
      {children}
    </div>
  )
}

export default BaseLayout
