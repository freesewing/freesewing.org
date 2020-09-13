import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import MainAside from '../menus/main-aside'

const DefaultLayout = (props) => {
  return (
    <div className="fs-sa" dataLayout="docs">
      <aside>
        <div className="sticky">
          <MainAside app={props.app} active={props.active} />
          <div className="aside-context">{props.context || null}</div>
        </div>
      </aside>
      <section>
        <BreadCrumbs crumbs={props.app.crumbs} pageTitle={props.app.title} />
        <h1>{props.app.title}</h1>
        {props.text && <div style={{ maxWidth: '80ch' }}>{props.children}</div>}
        {!props.text && props.children}
      </section>
    </div>
  )
}

export default DefaultLayout
