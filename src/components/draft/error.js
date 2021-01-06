import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Blockquote from '@freesewing/components/Blockquote'
import Robot from '@freesewing/components/Robot'
import Icon from '@freesewing/components/Icon'
import useUiMdx from '../../hooks/useUiMdx'
import Mdx from '../mdx'

const DraftError = ({
  error,
  draftEvents,
  updatePatternData,
  setCrashReport,
  app,
  preview = false,
  data,
  pattern
}) => {
  const uiMdx = useUiMdx()
  // Style
  const styles = {
    errorWrapper: {
      maxWidth: '800px',
      margin: 'auto'
    },
    error: {
      overflowX: 'auto',
      fontSize: '80%',
      fontFamily: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  }

  const uiPath = 'errors/broken-' + (preview ? 'draft-preview' : 'draft')

  return (
    <div>
      <div style={styles.header}>
        <h3>{uiMdx[uiPath].title}</h3>
        <Robot pose="shrug" size={150} />
      </div>
      <Mdx node={uiMdx[uiPath]} />
      <p style={{ textAlign: 'center' }}>
        {preview ? (
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href={`/recreate/${data.design}/from/${pattern}/`}
          >
            <FormattedMessage id="app.recreatePattern" />
          </Button>
        ) : (
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setCrashReport(true)}
          >
            <Icon icon="github" style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="app.reportThisOnGithub" />
          </Button>
        )}
      </p>
      {draftEvents}
    </div>
  )
}

export default DraftError
