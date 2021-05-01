import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { list } from '@freesewing/pattern-info'

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
    >
      <ul className="links">
        {list.map((pattern) => {
          let title = app.translate(`patterns.${pattern}.title`)
          return (
            <li key={pattern}>
              <Link to={`/create/${pattern}/`} title={title}>
                <FormattedMessage id={'patterns.' + pattern + '.title'} />
              </Link>
            </li>
          )
        })}
      </ul>
    </AppWrapper>
  )
}

export default Page
