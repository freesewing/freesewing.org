import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import usePattern from '../../../hooks/usePattern'
import AppWrapper from '../../../components/app/wrapper'

import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'
import LoadingLayout from '../../../components/layouts/loading'
import PatternNotes from '../../../components/pattern/notes'
import { FormattedMessage } from 'react-intl'
import PatternPreview from '../../../components/pattern/preview'

const Page = (props) => {
  const app = useApp()

  const [pattern, setPattern] = useState('pending')
  const [person, setPerson] = useState('pending')
  // Page title won't be available until async code runs
  const [title, setTitle] = useState(app.translate('app.pattern'))
  const [description, setDescription] = useState(false)

  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
        setPattern(p)
        setTitle(p.name)
        setDescription(p.notes || false)
      })
    } else {
      setPattern(patternOrPromise)
      setTitle(patternOrPromise.name)
      setDescription(patternOrPromise.notes || false)
    }
  }, [props.pattern])

  if (pattern === 'pending') return <LoadingLayout app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  let saveAs = null
  if (app.account && app.account.username)
    saveAs = (
      <li>
        <Link to={`/patterns/${props.params.pattern}/save-as/`}>
          <FormattedMessage id="app.saveAsNewPattern" />
        </Link>
      </li>
    )

  return (
    <AppWrapper
      app={app}
      title={title}
      description={description}
      crumbs={[{ title: app.translate('app.patterns'), slug: '/patterns/' }]}
    >
      <Blockquote type="tip">
        <h5>
          <FormattedMessage id="app.actions" />
        </h5>
        <ul className="links">
          <li>
            <Link to={`/patterns/${props.params.pattern}/export/`}>
              <FormattedMessage id="app.exportPattern" />
            </Link>
          </li>
          <li>
            <Link to={`/patterns/${props.params.pattern}/edit/`}>
              <FormattedMessage
                id="app.editThing"
                values={{ thing: <FormattedMessage id="app.pattern" /> }}
              />
            </Link>
          </li>
          <li>
            <Link to={`/recreate/${pattern.data.design}/from/${props.params.pattern}/`}>
              <FormattedMessage
                id="app.recreateThing"
                values={{ thing: <FormattedMessage id="app.pattern" /> }}
              />
            </Link>
          </li>
          {saveAs}
        </ul>
      </Blockquote>
      {pattern.notes && <PatternNotes notes={pattern.notes} app={app} />}
      <div className="preview shadow">
        <PatternPreview data={pattern.data} app={app} />
      </div>
    </AppWrapper>
  )
}

export default Page
