import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import contributors from '../../../contributors.yaml'
import Contributor from '../../components/contributor'
import { FormattedMessage } from 'react-intl'

const CommunityPage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.community'))
  }, [])

  const teamMembers = (team) => {
    let members = []
    for (const contributor of contributors.people) {
      if (contributor.teams.indexOf(team) !== -1) members.push(contributor)
    }

    return members
  }

  const context = [
    <h5>
      <FormattedMessage id="app.community" />
    </h5>,
    <h6>
      <a href="#where">
        <FormattedMessage id="cty.whereToFindUs" />
      </a>
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
      <a href="#who">
        <FormattedMessage id="cty.whoWeAre" />
      </a>
    </h6>,
    <ul>
      {contributors.people.map((person) => (
        <li key={person.name}>
          <a href={`#${person.name.toLowerCase()}`}>{person.name}</a>
        </li>
      ))}
    </ul>,
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
    <AppWrapper app={app}>
      <Layout app={app} active="community" text context={context}>
        <ul className="links">
          <li>
            <a href="#where">
              <FormattedMessage id="cty.whereToFindUs" />
            </a>
          </li>
          <li>
            <a href="#who">
              <FormattedMessage id="cty.whoWeAre" />
            </a>
          </li>
          <li>
            <a href="#teams">{uiMdx['community/teams'].title}</a>
          </li>
        </ul>
        <Blockquote type="tip">
          <Mdx node={uiMdx[`community/hashtag`]} />
        </Blockquote>

        <h2 id="where">
          <FormattedMessage id="cty.whereToFindUs" />
        </h2>
        <Mdx node={uiMdx[`community/where`]} />

        <h2 id="who">
          <FormattedMessage id="cty.whoWeAre" />
        </h2>
        <Mdx node={uiMdx[`community/who`]} />
        {contributors.people.map((person) => (
          <Contributor contributor={person} app={app} key={person.name} />
        ))}
        <h2 id="teams">{uiMdx['community/teams'].title}</h2>
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(CommunityPage)
