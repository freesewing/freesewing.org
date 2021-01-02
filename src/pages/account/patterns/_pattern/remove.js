import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import usePattern from '../../../../hooks/usePattern'
import AppWrapper from '../../../../components/app/wrapper'

import Loading from '../../../../components/loading'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import { navigate } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const Page = (props) => {
  const app = useApp()
  const pattern = usePattern(app, props.params.pattern)

  if (!pattern) {
    if (app.account.username) app.navigate('/account/patterns/')
    else app.navigate('/')
    return null
  }

  const title = app.translate('app.removeThing', { thing: app.translate('app.pattern') })

  return (
    <AppWrapper app={app} title={title} {...app.treeProps(props.location.pathname, false)}>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className="danger"
        onClick={() => app.removePattern(props.params.pattern)}
      >
        {title} {props.params.pattern}
      </Button>
    </AppWrapper>
  )
}

export default Page
