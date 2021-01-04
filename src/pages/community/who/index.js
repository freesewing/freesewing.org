import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import Offspring from '../../../components/offspring'
import { FormattedMessage } from 'react-intl'
import { graphql, Link } from 'gatsby'
import '../../../components/cmty/style.scss'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('cty.whoWeAre')}
      {...app.treeProps(props.path)}
      noTitle
    >
      <h1 className="scribble">
        <FormattedMessage id="cty.whoWeAre" />
      </h1>
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
