import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { list, measurements } from '@freesewing/pattern-info'
import LineDrawing from '@freesewing/components/LineDrawing'
import capitalize from '@freesewing/utils/capitalize'
import './index.scss'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.chooseADesign')}
      crumbs={[
        {
          slug: '/create/',
          title: app.translate('app.newThing', { thing: app.translate('app.pattern') }),
        },
      ]}
      wide
    >
      <div id="design-wrapper">
        {list.map((pattern) => {
          let title = app.translate(`patterns.${pattern}.title`)
          let createLink
          if (measurements[pattern].length === 0) createLink = `/create/${pattern}/for/any/`
          else createLink = `/create/${pattern}/`
          return (
            <div key={pattern} className="shadow designcard">
              <Link data-test="post-link" to={createLink} title={title}>
                <LineDrawing pattern={pattern} size={166} />
                <h5>{capitalize(pattern)}</h5>
                <p>
                  <FormattedMessage id={'patterns.' + pattern + '.title'} />
                </p>
              </Link>
            </div>
          )
        })}
      </div>
    </AppWrapper>
  )
}

export default Page
