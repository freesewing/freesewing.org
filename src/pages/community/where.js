import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../../components/mdx'
import contributors from '../../../contributors.yaml'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  const teamMembers = (team) => {
    let members = []
    for (const contributor of contributors.people) {
      if (contributor.teams) {
        if (contributor.teams.indexOf(team) !== -1) members.push(contributor)
      }
    }

    return members
  }

  const context = [
    <h5>
      <Link to="/community/">
        <FormattedMessage id="app.community" />
      </Link>
    </h5>,
    <h6>
      <Link to="/community/who/">
        <FormattedMessage id="cty.whoWeAre" />
      </Link>
    </h6>,
    <h6>
      <Link to="/community/where/">
        <FormattedMessage id="cty.whereToFindUs" />
      </Link>
    </h6>,
    <ul>
      {['Discord', 'Facebook', 'Github', 'Instagram', 'Reddit', 'Twitter', 'YouTube', 'Zoom'].map(
        (p) => (
          <li key={p}>
            <a href={`#${p.toLowerCase()}`}>{p}</a>
          </li>
        )
      )}
    </ul>,
    <h6>
      <Link to="/community/teams/">{uiMdx['community/teams'].title}</Link>
    </h6>
  ]

  return (
    <AppWrapper
      app={app}
      title={app.translate('cty.whereToFindUs')}
      context={context}
      crumbs={[{ slug: '/community/', title: <FormattedMessage id="app.community" /> }]}
      active="community"
      text
      noTitle
    >
      <h1 className="scribble">
        <FormattedMessage id="cty.whereToFindUs" />
      </h1>
      <Mdx node={uiMdx[`community/where`]} />
    </AppWrapper>
  )
}

export default Page
