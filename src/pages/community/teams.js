import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import useUiMdx from '../../hooks/useUiMdx'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import contributors from '../../../contributors.yaml'
import Contributor from '../../components/cmty/contributor'
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
      <Link to="/community">
        <FormattedMessage id="app.community" />
      </Link>
    </h5>,
    <h6>
      <Link to="/community/where/">
        <FormattedMessage id="cty.whereToFindUs" />
      </Link>
    </h6>,
    <h6>
      <Link to="/community/who/">
        <FormattedMessage id="cty.whoWeAre" />
      </Link>
    </h6>,
    <h6>
      <a href="#teams">{uiMdx['community/teams'].title}</a>
    </h6>,
    <ul>
      {contributors.teams.map((team) => (
        <li key={team}>
          <a href={`#team-${team.toLowerCase()}`}>
            <FormattedMessage id={`cty.${team}`} /> <FormattedMessage id="cty.team" />
          </a>
        </li>
      ))}
    </ul>
  ]

  return (
    <AppWrapper
      app={app}
      title={app.translate('cty.teams')}
      context={context}
      crumbs={[{ slug: '/community/', title: <FormattedMessage id="app.community" /> }]}
      active="community"
      text
      noTitle
    >
      <h1 className="scribble">
        <FormattedMessage id="cty.teams" />
      </h1>
      <Mdx node={uiMdx[`community/teams`]} />
      {contributors.teams.map((team) => (
        <>
          <h4 id={`team-${team.toLowerCase()}`}>
            <FormattedMessage id={`cty.${team}`} /> <FormattedMessage id="cty.team" />
          </h4>
          {teamMembers(team).map((m) => (
            <Contributor contributor={m} app={app} />
          ))}
        </>
      ))}
    </AppWrapper>
  )
}

export default Page
