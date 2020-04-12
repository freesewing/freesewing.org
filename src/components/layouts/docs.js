import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import Navigation from '../app/docs-navigation'

const DocsLayout = ({ app, slug, children }) => {
  const style = {
    text: {
      maxWidth: '42em',
      margin: 'auto'
    }
  }

  return (
    <div className="fs-sa" dataLayout="docs">
      <section>
        <article style={style.text}>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
          <h1>{app.title}</h1>
          <div style={style.text}>{children}</div>
        </article>
      </section>
      <aside>
        <div className="sticky">
          <Navigation app={app} slug={slug} />
        </div>
      </aside>
    </div>
  )
}

export default DocsLayout
