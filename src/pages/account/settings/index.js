import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import ReadMore from '../../../components/mdx/readmore'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.settings')} {...app.treeProps(props.path)}>
      <ReadMore list pages={app.getOffspring(props.path)} />
    </AppWrapper>
  )
}

export default Page
