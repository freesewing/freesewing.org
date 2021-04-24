import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import DraftUi from '../../../components/draft/ui'

import LoadingLayout from '../../../components/layouts/loading'
import usePattern from '../../../hooks/usePattern'
import usePerson from '../../../hooks/usePerson'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

/*
 * This page allows you to edit patterns
 */

const Page = (props) => {
  const app = useApp()

  const [pattern, setPattern] = useState(null)
  const [person, setPerson] = useState(null)
  const [design, setDesign] = useState(null)
  // Page title won't be available until async code runs
  const [title, setTitle] = useState(app.translate('app.pattern'))
  const [description, setDescription] = useState(false)

  // SSR
  if (typeof props.pattern === 'undefined') return <LoadingLayout app={app} />

  // Effects
  useEffect(() => {
    /*
     * The usePattern hook is used to load the pattern
     *
     *   - Patterns that are in localStorage return instantly
     *   - Patterns loaded from the backend return a promise
     *
     *  pop = patternOrPromise
     */
    let pop = usePattern(app, props.pattern)
    if (pop.then instanceof Function) {
      // Pending promise
      pop.then((p) => {
        setPattern(p)
        setPerson(usePerson(app, p.person))
        setDesign(p.data.design)
        setTitle(p.name)
        setDescription(p.notes || false)
      })
    } else {
      setDesign(pop.data.design)
      setPerson(usePerson(app, pop.data.settings.metadata.forHandle))
      setPattern(pop)
      setTitle(pop.name)
      setDescription(pop.notes || false)
    }
  }, [props.pattern])

  const crumbs = [
    {
      slug: `/patterns/`,
      title: app.translate('app.patterns'),
    },
    {
      slug: `/patterns/${props.params.pattern}/`,
      title,
    },
  ]

  if (person && pattern && design)
    return (
      <AppWrapper app={app} title={title} noLayout>
        <DraftUi
          mode="edit"
          app={app}
          design={design}
          person={person}
          pattern={pattern}
          data={pattern.data}
          title={title}
          description={description}
          crumbs={crumbs}
          patternHandle={props.params.pattern}
          actions={['zoom', 'compare', 'saveAsOther', 'exportOther']}
        />
      </AppWrapper>
    )

  if (pattern && !person)
    return (
      <AppWrapper app={app} title={title} crumbs={crumbs} active="account" text>
        <Blockquote type="note">
          <h4>
            <FormattedMessage id="app.recreatePattern" />
          </h4>
          <p>
            <FormattedMessage id="app.recreatePattern-txt" />
          </p>
          <p>
            <Button
              variant="contained"
              color="primary"
              href={`/recreate/${design}/from/${pattern.handle}/`}
            >
              <FormattedMessage id="app.recreatePattern" />
            </Button>
          </p>
        </Blockquote>
        <Blockquote type="warning">
          <h6>
            <FormattedMessage id="app.editOwnPatternsOnly" />
          </h6>
          <p>
            <FormattedMessage id="app.editOwnPatternsOnly-txt" />
          </p>
        </Blockquote>
      </AppWrapper>
    )

  return <LoadingLayout app={app} />
}

export default Page
