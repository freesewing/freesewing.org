import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import contributors from '../../../../contributors.yaml'
import Contributor from '../../../components/cmty/contributor'

const Page = (props) => {
  const app = useApp()

  const teamMembers = (team) => {
    let members = []
    for (const contributor of contributors.people) {
      if (contributor.teams) {
        if (contributor.teams.indexOf(team) !== -1) members.push(contributor)
      }
    }

    return members
  }

  const title = app.translate('cty.patternDesign') + ' ' + app.translate('cty.team')

  return (
    <AppWrapper app={app} title={title} {...app.treeProps(props.path)} noTitle>
      <h1 className="scribble">{title}</h1>
      {teamMembers('patternDesign').map((m) => (
        <Contributor contributor={m} app={app} key={m.name} />
      ))}
    </AppWrapper>
  )
}

export default Page
