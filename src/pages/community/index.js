import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import Offspring from '../../components/offspring'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.community')}
      noTitle
      {...app.treeProps(props.path)}
    >
      <h1 className="scribble">#WeAre&shy;FreeSewing</h1>
      <p dangerouslySetInnerHTML={{ __html: app.translate('app.txt-footer') }} />
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
