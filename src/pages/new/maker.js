import React, { useState, useCallback } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import Blockquote from '@freesewing/components/Blockquote'
import Author from '../../components/author'
import TextField from '@material-ui/core/TextField'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Markdown from 'react-markdown'
import axios from 'axios'

const maker = {
  name: 'joost',
  displayname: 'Joost De Cock',
  about:
    "Joost is FreeSewing's maintainer. As an introvert, he enjoys making clothes and shoes since you don't have to leave the house to do so 🙈\n\nYou can follow him as [j__st on Twitter](https://twitter.com/j__st) or [joostdecock on Github](https://github.com/joostdecock).",
  picture: {
    formats: {
      thumbnail: {
        name: 'thumbnail_joost.jpg',
        hash: 'thumbnail_joost_85adc5fad6',
        ext: '.jpg',
        mime: 'image/jpeg',
        width: 156,
        height: 156,
        size: 6.73,
        path: null,
        url: '/uploads/thumbnail_joost_85adc5fad6.jpg',
      },
      xsmall: {
        name: 'xsmall_joost.jpg',
        hash: 'xsmall_joost_85adc5fad6',
        ext: '.jpg',
        mime: 'image/jpeg',
        width: 200,
        height: 200,
        size: 10.26,
        path: null,
        url: '/uploads/xsmall_joost_85adc5fad6.jpg',
      },
    },
  },
}

const Page = (props) => {
  const app = useApp()

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  const [img, setImg] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const [help, setHelp] = useState(false)
  const [displayname, setDisplayname] = useState('')
  const [about, setAbout] = useState('')
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [ready, setReady] = useState(false)

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
    preview: {
      margin: '1rem 0',
      borderRadius: '6px',
      padding: '1rem 2rem',
    },
  }
  const createProfile = async () => {
    app.setLoading(true)
    let result = false
    try {
      result = await axios.post('https://backend.freesewing.org/strapi/maker', {
        displayname,
        about,
        picture: img,
      })
    } catch (err) {
      setError(true)
      if (err?.response?.data?.error) setErrorMsg(err.response.data.error)
    } finally {
      app.setLoading(false)
      setReady(error ? true : result?.data)
    }

    return
  }

  const init = () => {
    setImg(false)
    setHelp(false)
    setAbout('')
    setDisplayname('')
    setError(false)
    setReady(false)
  }

  return (
    <AppWrapper app={app} title="Create a new maker">
      {!help && !ready && (
        <p>
          <Button onClick={() => setHelp(true)} variant="outlined" color="primary" size="large">
            Show help
          </Button>
        </p>
      )}
      {help && !ready && (
        <blockquote>
          <h3>
            What is this page? <span role="image">🤔</span>
          </h3>
          <p>
            This page allows anyone to add a new <b>maker profile</b> to our backend system so we
            can link it to one or more <b>showcase posts</b>.
          </p>
          <h3>
            Maker profile? Showcase posts? Wut? <span role="image">🤯</span>
          </h3>
          <h5>Showcase posts</h5>
          <p>
            We like to showcase the makes of the FreeSewing community on freesewing.org in so-called{' '}
            <b>
              <Link to="/showcase/">showcase posts</Link>
            </b>
            .
            <br />
            It's not merely about inspiration and showing off (it is a bit though) it also helps
            others to see what our designs look like, or how you can achieve different styles.
          </p>
          <h5>Maker profile</h5>
          <p>
            We give all makers who get showcases the possibility to have a <b>maker profile</b> that
            goes along with their showcase posts.
            <br />
            Think of it as a Instagram or Twitter bio. It's a place where you can tell a little
            about yourself and point fans of your work in the right direction to discover more of
            it.
          </p>
          <h3>
            Ok, so what goes in a <em>maker profile</em>? <span role="image">🧐</span>
          </h3>
          <p>The following fields make up a maker profile:</p>
          <ul>
            <li>
              <b>displayname</b>: The name to be displayed
              <br />
              <small>
                This can be your real name, or a pseudonym or other handle that you like to use
              </small>
            </li>
            <li>
              <b>picture</b>: A picture or avatar to be displayed
              <br />
              <small>
                Your picture will be cropped square and rounded into a circle (see example below)
              </small>
            </li>
            <li>
              <b>about</b>: A little bio or blurb to go along the name/picture
              <br />
              <small>
                This is where you can tell a little bit about yourself. Supports{' '}
                <a href="https://www.markdownguide.org/">markdown</a> so you can add links too
              </small>
            </li>
          </ul>
          <h3>
            Example of a maker profile <span role="image">👀</span>
          </h3>
          <p>Below is an example of a maker profile:</p>
          <Author author={maker} type="showcase" />
          <p>
            <Button onClick={() => setHelp(false)} variant="outlined" color="primary" size="large">
              Hide help
            </Button>
          </p>
        </blockquote>
      )}
      {!ready && (
        <>
          <h2>Maker details</h2>
          <h5>displayname</h5>
          <TextField
            id="displayname"
            fullWidth={true}
            label="Displayname"
            margin="normal"
            variant="outlined"
            value={displayname}
            type="text"
            onChange={(evt) => setDisplayname(evt.target.value)}
          />
          <h5>picture</h5>
          <div style={styles.wrapper}>
            <img
              alt="avatar"
              src={img || app?.account?.pictureUris?.m}
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
          <h5>about</h5>
          <TextField
            id="about"
            multiline={true}
            rows="4"
            rowsMax="12"
            fullWidth={true}
            label="about"
            margin="normal"
            variant="outlined"
            value={about}
            onChange={(evt) => setAbout(evt.target.value)}
          />
          <div style={styles.preview} className="shadow">
            <Markdown>{about}</Markdown>
          </div>
          <p>
            {img && about.length > 1 && displayname.length > 1 ? (
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => createProfile()}
              >
                Create maker profile
              </Button>
            ) : (
              <Button disabled>Please complete all fields</Button>
            )}
          </p>
        </>
      )}
      {error && ready && (
        <Blockquote type="warning">
          <h5>Oh no, something went wrong</h5>
          {errorMsg ? (
            <>
              <p>The error was:</p>
              <blockquote>{errorMsg}</blockquote>
            </>
          ) : (
            <p>Please report this, as it should not happen</p>
          )}
          <p>
            <Button onClick={init} variant="outlined" color="primary">
              Click here to try again
            </Button>
          </p>
        </Blockquote>
      )}
      {ready && !error && (
        <>
          <h2>Awesome!</h2>
          <p>Hey thanks a million, this is really great.</p>
          <p>
            If you were asked by a FreeSewing contributor to fill in this form, please let them know
            you did so, and tell them you created maker profile: <b>{ready.displayname}</b>
            <br />
            <small>
              (with id <code>{ready.id}</code>)
            </small>
          </p>
          <p>
            <Button onClick={init} variant="outlined" color="primary">
              Create another maker profile
            </Button>
          </p>
        </>
      )}
    </AppWrapper>
  )
}

export default Page
