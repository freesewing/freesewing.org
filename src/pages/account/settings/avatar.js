import React, { useState, useCallback, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const AvatarSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // State
  const [img, setImg] = useState(false)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.avatar'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
  }, [])

  // Styles
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

  if (app.mobile) {
    styles.avatar.width = '100%'
    styles.dropzone.width = '100%'
    styles.dropzone.marginTop = '2rem'
    styles.dropzone.height = '200px'
  }

  return (
    <AppWrapper app={app} context={<AccountContext app={app} />}>
      <Layout app={app} active="account" context={<AccountContext app={app} />} text>
        <div style={styles.wrapper}>
          <img
            alt="avatar"
            src={img || app.account.pictureUris.m}
            style={styles.avatar}
            className="shadow"
          />
          <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()} />
            <p data-test="instructions">
              <FormattedMessage id="app.dragAndDropImageHere" />
            </p>
            <p>
              <Button variant="outlined" color="primary" data-test="pick-file">
                <FormattedMessage id="app.selectImage" />
              </Button>
            </p>
          </div>
        </div>
        <p style={{ textAlign: 'right' }}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href="/account/settings"
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          {img ? (
            <Button
              data-test="save"
              style={{ marginLeft: '1rem' }}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => app.updateAccount([img, 'avatar'], '/account/settings/')}
            >
              <FormattedMessage id="app.save" />
            </Button>
          ) : null}
        </p>
        <Blockquote type="note">
          <FormattedMessage id="account.avatarInfo" />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(AvatarSettingPage)
