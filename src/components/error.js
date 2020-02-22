import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Icon from '@freesewing/components/Icon'
import camelCase from '@freesewing/utils/camelCase'

const defaultError = { message: 'error' }

const Error = ({ report = false, err = defaultError }) => {
  if (report)
    return (
      <React.Fragment>
        <p>
          <FormattedMessage id={'errors.' + camelCase(err.message)} />
        </p>
        <p>
          <Button
            variant="outlined"
            color="primary"
            href="https://github.com/freesewing/website/issues/new"
            target="_BLANK"
          >
            <Icon icon="github" style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="app.reportThisOnGithub" />
          </Button>
        </p>
      </React.Fragment>
    )
  else return <FormattedMessage id={'errors.' + camelCase(err.message)} />
}

export default Error
