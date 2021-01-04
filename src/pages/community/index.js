import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import useUiMdx from '../../hooks/useUiMdx'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import Offspring from '../../components/offspring'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.community')}
      noTitle
      {...app.treeProps(props.path)}
      wide
    >
      <h1 className="scribble">#WeAre&shy;FreeSewing</h1>
      <h4
        className="scribble"
        dangerouslySetInnerHTML={{ __html: app.translate('app.txt-footer') }}
      />
      <Offspring app={app} slug={props.path} />
    </AppWrapper>
  )
}

export default Page
