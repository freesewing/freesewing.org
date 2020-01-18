import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Blockquote from '@freesewing/components/Blockquote'
import Robot from '@freesewing/components/Robot'
import Icon from '@freesewing/components/Icon'

const DraftError = ({ error, updateGist }) => {
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
    }
  }

  if (error.message === 'cannot scale this curve. Try reducing it first.')
    return (
      <div style={styles.errorWrapper} data-test="error">
        <Blockquote type="warning">
          <div style={{ float: 'right' }}>
            <Robot pose="fail" size={250} />
          </div>
          <h3>
            <FormattedMessage id="app.ohNo" />
          </h3>
          <p>
            You just hit a known issue in an upstream library we use for Bezier curve offsets. We
            are aware of this problem, but it is all but trivial to fix.{' '}
          </p>
          <p>
            As this problem happens when we calculate a path offset, it is most commonly triggered
            when calculating the seam allowance. As such, disabling the seam allowance is often the
            best way to (try to) sidestep the problem.
          </p>
          <p>
            You can click below to disable the seam allowance (or do so in the pattern
            configuration, or read more about this in the issue on GitHub.
          </p>
          <p style={{ textAlign: 'right', clear: 'both', marginTop: '3rem' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => updateGist(0, 'settings', 'sa')}
              style={{ marginLeft: '1rem' }}
            >
              Disable seam allowance
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="https://github.com/freesewing/freesewing.org/issues/19"
              target="_BLANK"
              style={{ marginLeft: '1rem' }}
            >
              <Icon icon="github" style={{ marginRight: '0.5rem' }} />
              Read more on GitHub
            </Button>
          </p>
        </Blockquote>
      </div>
    )

  return (
    <div style={styles.errorWrapper} data-test="error">
      <Blockquote type="warning">
        <div style={{ float: 'right' }}>
          <Robot pose="fail" size={250} />
        </div>
        <h3>
          <FormattedMessage id="app.ohNo" />
        </h3>
        <p>
          <FormattedMessage id="errors.requestFailedWithStatusCode500" />
        </p>
        <p>
          <b>{error.name}</b>: {error.message}
        </p>
        <p style={{ textAlign: 'right', clear: 'both', marginTop: '3rem' }}>
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/freesewing/freesewing.org/issues/new"
            target="_BLANK"
          >
            <Icon icon="github" style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="app.reportThisOnGithub" />
          </Button>
        </p>
        <h5>Stack trace</h5>
        <pre
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(error.stack.replace(/\n/g, '<br />'), null, 2).slice(1, -1)
          }}
          style={styles.error}
        />
      </Blockquote>
    </div>
  )
}

export default DraftError
