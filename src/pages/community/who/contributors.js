import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import contributors from '../../../../contributors.yaml'
import { FormattedMessage } from 'react-intl'
import Contributor from '../../../components/cmty/contributor'

const Page = (props) => {
  const app = useApp()

  const href = 'https://github.com/freesewing/freesewing.org/edit/develop/contributors.yaml'

  return (
    <AppWrapper
      app={app}
      title={app.translate('cty.contributors')}
      {...app.treeProps(props.path)}
      noTitle
    >
      <h1 className="scribble">
        <FormattedMessage id="cty.contributors" />
      </h1>
      {contributors.people.map((person) => (
        <Contributor contributor={person} app={app} key={person.name} />
      ))}
      <Blockquote type="note">
        <h5>Are you missing from this list?</h5>
        <p>
          Then why not <a href={href}>add yourself</a>
        </p>
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
