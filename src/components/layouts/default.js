import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import MainAside from '../menus/main-aside'
import PrevNext from '../prev-next'
import './default.scss'

const DefaultLayout = (props) => {
  return (
    <div className="layout">
      <aside>
        <div className="sticky">
          {props.preMenu || null}
          {props.mainMenu}
        </div>
      </aside>
      <section>
        {!props.noCrumbs && (
          <BreadCrumbs app={props.app} crumbs={props.crumbs} pageTitle={props.title} />
        )}
        {!props.noTitle && <h1>{props.title}</h1>}
        <div className={`content ${props.wide ? 'wide' : ''}`}>
          {props.children}
          <PrevNext prev={props.prev} next={props.next} />
        </div>
      </section>
    </div>
  )
}

export default DefaultLayout
