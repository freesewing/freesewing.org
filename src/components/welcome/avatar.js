import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'

const Units = ({ app, continueButton }) => {
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

  return (
    <div>
      <Blockquote type="note">
        <p>
          <FormattedMessage id="account.avatarInfo" />
        </p>
      </Blockquote>
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
      {continueButton('bio', 'avatar', { avatar: img })}
    </div>
  )
}

export default Units
