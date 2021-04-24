import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

/*
 * We're wrapping this in an extra diff to prevent
 * flexbox messing with the ::before content added via CSS
 */

const PatternShareLink = (props) => {
  const link = 'https://freesewing.org/patterns/' + props.pattern

  return (
    <div>
      <div className="gatsby-highlight">
        <pre className="language-html">
          <code>
            <a href={link} style={{ color: '#74c0fc' }}>
              {link}
            </a>
            <CopyToClipboard
              text={link}
              onCopy={() =>
                props.app.setNotification({
                  type: 'success',
                  msg: props.app.translate('app.copiedToClipboard'),
                })
              }
            >
              <Button
                color={props.app.theme === 'light' ? 'secondary' : 'primary'}
                variant="outlined"
                style={{ float: 'right' }}
              >
                <FormattedMessage id="app.copy" />
              </Button>
            </CopyToClipboard>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default PatternShareLink
