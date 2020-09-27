import React from 'react'
import NavCrumbs from '../navcrumbs'
import BreadCrumbs from '../breadcrumbs'
import MainAside from '../menus/main-aside'
import './default.scss'

const DefaultLayout = (props) => {
  return (
    <div className="fs-sa" dataLayout="docs">
      <aside>
        <div className="sticky">
          <MainAside app={props.app} active={props.active} />
          <div className="aside-context">{props.app.context || null}</div>
        </div>
      </aside>
      <section>
        <BreadCrumbs crumbs={props.app.crumbs} pageTitle={props.app.title} />
        <h1>{props.app.title}</h1>
        {props.app.toc ? (
          <div className="text-toc-wrapper">
            <div className="text">{props.children}</div>
            <div className="toc">{props.app.toc}</div>
          </div>
        ) : props.text ? (
          <div style={{ maxWidth: '80ch' }}>{props.children}</div>
        ) : (
          props.children
        )}
      </section>
    </div>
  )
}

export default DefaultLayout
