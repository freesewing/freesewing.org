import React from 'react'
import BreadCrumbs from '../breadcrumbs'

const DraftLayout = ({ app, children, aside }) => {
  return (
    <div className="fs-sa">
      <section>
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
          <h1>{app.title}</h1>
        </div>
        {children}
      </section>
      <aside>{aside}</aside>
    </div>
  )
}

export default DraftLayout
