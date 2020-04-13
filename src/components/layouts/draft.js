import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import MobileAside from '../menus/mobile-aside'

const DraftLayout = ({ app, children, aside }) => {
  return (
    <div className="fs-sa" dataLayout="draft">
      <section>
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
        </div>
        {children}
      </section>
      {app.mobile ? (
        <MobileAside app={app} content={aside} />
      ) : (
        <aside>
          <div className="sticky">{aside}</div>
        </aside>
      )}
    </div>
  )
}

export default DraftLayout
