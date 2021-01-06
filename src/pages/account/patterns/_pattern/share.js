import React from 'react'
import useApp from '../../../../hooks/useApp'
import useUiMdx from '../../../../hooks/useUiMdx'
import AppWrapper from '../../../../components/app/wrapper'

import Mdx from '../../../../components/mdx'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  const link = `${process.env.GATSBY_FRONTEND}patterns/${props.params.pattern}/`

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.shareThing', { thing: app.translate('app.pattern') })}
      {...app.treeProps(props.location.pathname, false)}
    >
      <Blockquote type="tip">
        <h5>{uiMdx['draft/how-to-share-a-pattern'].title}</h5>
        <h6>
          <a href={link}>{link}</a>
        </h6>
        <Mdx node={uiMdx['draft/how-to-share-a-pattern']} />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
