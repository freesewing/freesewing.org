import React, { useEffect, useState } from 'react'
import useApp from '../../../../../hooks/useApp'
import usePattern from '../../../../../hooks/usePattern'
import usePeople from '../../../../../hooks/usePeople'
import AppWrapper from '../../../../../components/app/wrapper'
import Layout from '../../../../../components/layouts/default'
import LoadingLayout from '../../../../../components/layouts/loading'
import SelectSizeContext from '../../../../../components/context/select-size'

import { FormattedMessage } from 'react-intl'
import SelectSize from '../../../../../components/draft/select-size'
import capitalize from '@freesewing/utils/capitalize'

const Page = (props) => {
  // Page context
  const design = props.pageContext.design

  // Hooks
  const app = useApp()
  const people = usePeople(app, props.pageContext.design)

  // State
  const [pattern, setPattern] = useState('pending')

  // Effects
  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
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
  useEffect(() => {
    app.setContext(
      <SelectSizeContext app={app} design={design} people={people} recreate={props.pattern} />
    )
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
      <Layout app={app} active="designs">
        <SelectSize app={app} design={design} people={people} recreate={props.pattern} />
      </Layout>
    </AppWrapper>
  )
}

export default Page
