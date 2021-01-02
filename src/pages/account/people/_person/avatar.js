import React, { useState, useCallback } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import PeopleContext from '../../../../components/context/people'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
    app.setContext(<PeopleContext app={app} />)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

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
      context={<PeopleContext app={app} />}
      crumbs={[
        { slug: '/people/', title: app.translate('app.people') },
        {
          slug: '/people/' + props.person + '/',
          title: app.people[props.person].name || props.person
        }
      ]}
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
          href={`/people/${props.person}/`}
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
            onClick={() =>
              app.updatePerson(props.person, [img, 'picture'], `/people/${props.person}/`)
            }
          >
            <FormattedMessage id="app.save" />
          </Button>
        ) : null}
      </p>
    </AppWrapper>
  )
}

export default Page
