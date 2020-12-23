import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

const SupportBanner = (props) => (
  <div className="stripe">
    <div className="stripe-content">
      <h1>
        <FormattedMessage id="app.supportFreesewing" />
      </h1>
      <h2>
        <FormattedMessage id="app.txt-tiers" />
      </h2>
      <p>
        <FormattedMessage id="app.patronPitch" />
      </p>
      <Button
        color="primary"
        className="accent"
        size="large"
        variant="contained"
        href="/patrons/join/"
        style={{
          margin: '1rem 1rem 0 0'
        }}
      >
        <FormattedMessage id="app.becomeAPatron" />
      </Button>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        href="/docs/about/pledge/"
        style={{ marginTop: '1rem' }}
      >
        <FormattedMessage id="app.ourRevenuePledge" />
      </Button>
    </div>
    <div className="stripe-bg"></div>
  </div>
)

export default SupportBanner
