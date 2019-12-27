import React from 'react'
import ContentWrapper from '../wrappers/content'
import BreadCrumbs from '../breadcrumbs'

const CenteredLayout = ({ app, children, top = false, noTitle = false }) => {
  const style = {
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto',
    minHeight: noTitle ? undefined : 'calc(100vh - 6rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: top ? 'top' : 'center'
  }

  return (
    <ContentWrapper>
      <div style={style}>
        {!noTitle && (
          <>
            <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
            <h1>{app.title}</h1>
          </>
        )}
        {children}
      </div>
    </ContentWrapper>
  )
}

export default CenteredLayout
