import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import DraftUi from '../../../components/draft/ui'

import usePattern from '../../../hooks/usePattern'
import usePerson from '../../../hooks/usePerson'
import LoadingLayout from '../../../components/layouts/loading'
import CenteredLayout from '../../../components/layouts/centered'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

/*
 * This page allows you to edit your own patterns
 */

const Page = (props) => {
  const app = useApp()

  // State
  const [pattern, setPattern] = useState(null)
  const [person, setPerson] = useState(null)
  const [design, setDesign] = useState(null)

  // SSR
  if (typeof props.pattern === 'undefined')
    return (
      <AppWrapper app={app}>
        <LoadingLayout app={app} />
      </AppWrapper>
    )

  // Methods
  const applyCrumbs = (handle, title) => {
    app.setCrumbs([
      {
        slug: `/patterns/`,
        title: app.translate('app.patterns')
      },
      {
        slug: `/patterns/${handle}/`,
        title
      }
    ])
  }

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
        applyCrumbs(props.pattern, p.name)
      })
    } else {
      setDesign(pop.data.design)
      setPerson(usePerson(app, pop.data.settings.metadata.forHandle))
      setPattern(pop)
      applyCrumbs(props.pattern, pop.name)
    }
    app.setTitle(app.translate('app.editThing', { thing: app.translate('app.pattern') }))
  }, [props.pattern])

  const fabs = ['zoom', 'compare', 'notes', 'save', 'saveAs', 'export', 'details']

  return (
    <AppWrapper app={app}>
      {person && pattern && design ? (
        <DraftUi
          mode="edit"
          app={app}
          design={design}
          person={person}
          pattern={pattern}
          data={pattern.data}
          fabs={fabs}
        />
      ) : person === false ? (
        <CenteredLayout app={app} top>
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
        </CenteredLayout>
      ) : (
        <LoadingLayout app={app} />
      )}
    </AppWrapper>
  )
}

export default Page
