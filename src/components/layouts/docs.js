import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import Navigation from '../app/docs-navigation'
import MainAside from '../menus/main-aside'

const DocsLayout = ({ app, slug, children, aside = null }) => {
  const style = {
    text: {
      maxWidth: '42em',
      margin: 'auto'
    }
  }

  return (
    <div className="fs-sa" dataLayout="docs">
      <aside>
        <div className="sticky">
          <MainAside app={app} active="docs" />
          <Navigation app={app} slug={slug} />
          <div className="aside-context">{aside}</div>
        </div>
      </aside>
      <section>
        <article style={style.text}>
          <BreadCrumbs crumbs={app.crumbs} pageTitle={app.title} />
          <h1>{app.title}</h1>
          <div style={style.text}>{children}</div>
        </article>
      </section>
    </div>
  )
}

export default DocsLayout
