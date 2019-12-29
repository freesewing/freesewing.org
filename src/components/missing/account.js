import React from 'react'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Link } from 'gatsby'

const AccountNotFound = props => (
  <Blockquote type="note" style={{ maxWidth: '800px', textAlign: 'center' }}>
    <h5>
      <FormattedMessage id="app.mtmIsOurJam" />
    </h5>
    <p>
      <FormattedHTMLMessage id="app.fitYouDeserve" />
    </p>
    <p style={{ textAlign: 'center' }}>
      <Button variant="contained" color="primary" size="large" href="/signup/">
        <FormattedMessage id="app.signUp" />
      </Button>
    </p>
    <p>
      <small>
        <FormattedHTMLMessage id="app.supportNag" />
      </small>
    </p>
  </Blockquote>
)

export default AccountNotFound
