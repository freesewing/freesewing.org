import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const AccountAvatar = props => {
  const [img, setImg] = useState(false)
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

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

  if (props.app.frontend.mobile) {
    styles.avatar.width = '100%'
    styles.dropzone.width = '100%'
    styles.dropzone.marginTop = '2rem'
    styles.dropzone.height = '200px'
  }

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.avatarInfo" />
      </Blockquote>
      <div style={styles.wrapper}>
        <img
          alt="avatar"
          src={img || props.app.account.pictureUris.m}
          style={styles.avatar}
          className="shadow"
        />
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          <p data-test='instructions'>
            <FormattedMessage id="app.dragAndDropImageHere" />
          </p>
          <p>
            <Button variant="outlined" color="primary" data-test='pick-file'>
              <FormattedMessage id="app.selectImage" />
            </Button>
          </p>
        </div>
      </div>
      <p style={{ textAlign: 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings" data-test='cancel'>
          <FormattedMessage id="app.cancel" />
        </Button>
        {img ? (
          <Button
            data-test="save"
            style={{ marginLeft: '1rem' }}
            size="large"
            variant="contained"
            color="primary"
            onClick={() =>
              props.app.backend.saveAccount(
                { avatar: img },
                props.app.frontend.intl.formatMessage({ id: 'account.avatar' })
              )
            }
          >
            <FormattedMessage id="app.save" />
          </Button>
        ) : null}
      </p>
    </React.Fragment>
  )
}

export default AccountAvatar
