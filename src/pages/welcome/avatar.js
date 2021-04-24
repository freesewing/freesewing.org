import React, { useState, useCallback } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import LoginRequired from '../../components/login-required'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  const [img, setImg] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    avatar: {
      width: 'calc(50% - 1rem)',
      borderRadius: '6px',
    },
    dropzone: {
      width: 'calc(50% - 3rem)',
      border: '6px dashed #aaa',
      textAlign: 'center',
      padding: '2rem 1rem',
    },
  }

  return (
    <LoginRequired app={app}>
      <AppWrapper
        app={app}
        title={app.translate('account.avatarTitle')}
        crumbs={[{ slug: '/welcome/', title: <FormattedMessage id="app.welcome" /> }]}
      >
        <div style={styles.wrapper}>
          <img
            alt="avatar"
            src={img || app.account.pictureUris.m}
            style={styles.avatar}
            className="shadow"
          />
          <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()} />
            <p>
              <FormattedMessage id="app.dragAndDropImageHere" />
            </p>
            <p>
              <Button variant="outlined" color="primary">
                <FormattedMessage id="app.selectImage" />
              </Button>
            </p>
          </div>
        </div>
        <p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => app.updateAccount([img, 'avatar'], '/welcome/bio/')}
          >
            <FormattedMessage id="app.continue" />
            <RightIcon style={{ marginLeft: '1rem' }} />
          </Button>
        </p>
        <LinearProgress color="primary" value={62} variant="determinate" />
        <Blockquote type="note">
          <p>
            <FormattedMessage id="account.avatarInfo" />
          </p>
        </Blockquote>
      </AppWrapper>
    </LoginRequired>
  )
}

export default Page
