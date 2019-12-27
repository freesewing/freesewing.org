import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import components from '../../hooks/useMdxComponents'

const DraftHelp = ({ docs, setDisplay, eventType, eventValue, pattern }) => {
  const close = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setDisplay('draft')}
      data-test="back"
    >
      <FormattedMessage id="app.back" />
    </Button>
  )
  const topicDocs = eventType === 'draftSettings' ? docs.settings : docs.options
  const style = {
    wrapper: {
      maxWidth: '42rem',
      margin: 'auto'
    },
    heading: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  }

  return (
    <div style={style.wrapper}>
      <h2 style={style.heading}>
        <div>
          <FormattedMessage id="app.docs" />
          <span>: </span>
          <FormattedMessage id={`options.${pattern}.${eventValue}.title`} />
        </div>
        {close}
      </h2>
      <div data-test="mdx">
        <MDXProvider components={components}>
          <MDXRenderer>{topicDocs[eventValue.toLowerCase()].body}</MDXRenderer>
        </MDXProvider>
      </div>
      <p style={{ textAlign: 'right' }}>{close}</p>
    </div>
  )
}

export default DraftHelp
