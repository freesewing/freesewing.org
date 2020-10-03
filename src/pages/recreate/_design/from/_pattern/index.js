import React, { useEffect, useState } from 'react'
import useApp from '../../../../../hooks/useApp'
import AppWrapper from '../../../../../components/app/wrapper'

import usePattern from '../../../../../hooks/usePattern'
import usePeople from '../../../../../hooks/usePeople'
import LoadingLayout from '../../../../../components/layouts/loading'
import SelectSizeContext from '../../../../../components/context/select-size'
import { FormattedMessage } from 'react-intl'
import SelectSize from '../../../../../components/draft/select-size'
import capitalize from '@freesewing/utils/capitalize'

const Page = (props) => {
  const app = useApp()

  const design = props.pageContext.design
  const people = usePeople(app, design)

  const [pattern, setPattern] = useState('pending')
  const [title, setTitle] = useState(
    app.translate('app.recreate') + ' ' + app.translate('app.pattern')
  )
  const [crumbs, setCrumbs] = useState([])
  const [context, setContext] = useState([])

  useEffect(() => {
    let patternOrPromise = usePattern(app, props.pattern)
    if (patternOrPromise.then instanceof Function) {
      patternOrPromise.then((p) => {
        setPattern(p)
        setTitle(app.translate('app.recreate') + ' ' + p.name)
        setCrumbs([
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
      setTitle(app.translate('app.recreate') + ' ' + patternOrPromise.name)
      setCrumbs([
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
    setContext(
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
    <AppWrapper app={app} title={title} context={context} crumbs={crumbs} active="designs">
      <SelectSize app={app} design={design} people={people} recreate={props.pattern} />
    </AppWrapper>
  )
}

export default Page
