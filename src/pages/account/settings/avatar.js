import React, { useState, useCallback, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import AccountContext from '../../../components/context/account'

import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

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

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [img, setImg] = useState(false)

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
    <AppWrapper
      app={app}
      title={app.translate('account.avatar')}
      crumbs={[
        { title: app.translate('app.account'), slug: '/account/' },
        { title: app.translate('app.settings'), slug: '/account/settings/' }
      ]}
      context={<AccountContext app={app} />}
      active="account"
      text
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
    </AppWrapper>
  )
}

export default Page
