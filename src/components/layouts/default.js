import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import PrevNext from '../prev-next'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import './default.scss'

const EditLink = ({ edit = false, folder }) =>
  edit ? (
    <IconButton
      className="editpencil"
      href={`https://github.com/freesewing/freesewing/edit/develop/markdown/${folder}/${edit}/en.md`}
      target="_BLANK"
      rel="nofollow"
      size="small"
      title="Edit this page"
    >
      <EditIcon />
    </IconButton>
  ) : null

const DefaultLayout = (props) => {
  return (
    <div className="layout-wrapper">
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
          {!props.noTitle && (
            <h1>
              {props.title}
              <EditLink edit={props.edit} folder={props.newsletter ? 'newsletter' : 'org'} />
            </h1>
          )}
          <div className={`content ${props.wide ? 'wide' : ''}`}>
            {props.children}
            <PrevNext prev={props.prev} next={props.next} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DefaultLayout
