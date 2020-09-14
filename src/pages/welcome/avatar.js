import React, { useEffect, useState, useCallback } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import WelcomeSteps from '../../components/context/welcome-steps'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LinearProgress from '@material-ui/core/LinearProgress'

import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const WelcomeAvatarPage = (props) => {
  // Hooks
  const app = useApp()
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [img, setImg] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    avatar: {
      width: 'calc(50% - 1rem)',
      borderRadius: '6px'
    },
    dropzone: {
      width: 'calc(50% - 3rem)',
      border: '6px dashed #aaa',
      textAlign: 'center',
      padding: '2rem 1rem'
    }
  }

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.avatarTitle'))
    app.setCrumbs([
      {
        slug: '/welcome/',
        title: <FormattedMessage id="app.welcome" />
      }
    ])
  }, [])

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text context={<WelcomeSteps app={app} />}>
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
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(WelcomeAvatarPage)
