import React, { useEffect, useState } from 'react'
import useApp from '../../../../../hooks/useApp'
import usePattern from '../../../../../hooks/usePattern'
import usePeople from '../../../../../hooks/usePeople'
import withLanguage from '../../../../../components/withLanguage'
import AppWrapper from '../../../../../components/app/wrapper'
import WideLayout from '../../../../../components/layouts/wide'
import LoadingLayout from '../../../../../components/layouts/loading'

import { FormattedMessage } from 'react-intl'
import SelectPerson from '../../../../../components/draft/select-person'
import capitalize from '@freesewing/utils/capitalize'

const RecreatePatternPage = props => {
  // Page context
  const design = props.pageContext.design

  // Hooks
  const app = useApp(props)
  const people = usePeople(app, props.pageContext.design)

  // State
  const [pattern, setPattern] = useState('pending')

  // Effects
  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then(p => {
        setPattern(p)
        app.setTitle(app.translate('app.recreate') + ' ' + p.name)
        app.setCrumbs([
          {
            slug: '/create',
            title: (
              <FormattedMessage
                id="app.newThing"
                values={{ thing: app.translate('app.pattern') }}
              />
            )
          },
          {
            slug: '/create',
            title: app.translate('app.recreate') + ' ' + capitalize(design)
          }
        ])
      })
    } else {
      setPattern(patternOrPromise)
      app.setTitle(app.translate('app.recreate') + ' ' + patternOrPromise.name)
      app.setCrumbs([
        {
          slug: '/create',
          title: (
            <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
          )
        },
        {
          slug: '/create',
          title: app.translate('app.recreate') + ' ' + capitalize(design)
        }
      ])
    }
  }, [])

  // Allow usePattern promise to resolve
  if (pattern === 'pending') return <LoadingLayout app={app} />
  else if (pattern === false) {
    if (app.account.username) app.navigate('/patterns/')
    else app.navigate('/')
    return null
  }

  return (
    <AppWrapper app={app}>
      <WideLayout app={app} top>
        <SelectPerson app={app} design={design} people={people} recreate={props.pattern} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(RecreatePatternPage)
