import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import useUiMdx from '../../../hooks/useUiMdx'
import Mdx from '../../../components/mdx'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'

const Page = (props) => {
  const app = useApp()
  const uiMdx = useUiMdx()

  const uiPath = 'draft/recreate-gist'
  const gistId = '82a98605db2d8769d8c40b42fbb76ca2'
  const title = app.translate('app.recreateThing', { thing: 'gist' })

  const [gist, setGist] = useState('')

  return (
    <AppWrapper app={app} title={title} description={title}>
      <TextField
        variant="outlined"
        fullWidth
        type="text"
        placeholder={gistId}
        aria-label={gistId}
        label="Github gist ID"
        onChange={(evt) => setGist(evt.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '1.5rem auto' }}
        onClick={() => navigate(`/recreate/gist/${gist.split('/').pop()}/`)}
      >
        {title}
      </Button>
      <div style={{ textAlign: 'left' }}>
        <h3>{uiMdx[uiPath].title}</h3>
        <Mdx node={uiMdx[uiPath]} />
      </div>
    </AppWrapper>
  )
}

export default Page
