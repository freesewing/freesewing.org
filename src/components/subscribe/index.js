import React from 'react'
import { FormattedMessage } from 'react-intl'
import PaypalButton from './PaypalButton'
import './index.scss'

const Subscribe = (props) => (
  <div className="tiers">
    {[2, 4, 8].map((tier) => (
      <div className={`tier tier-${tier}`} key={`tier-${tier}`}>
        <h2>
          <span className="price">{tier}€</span>
          <span className="period">
            <FormattedMessage id="app.perMonth" />
          </span>
        </h2>
        <p>
          <FormattedMessage id={`app.txt-tier${tier}`} />
        </p>
        <PaypalButton tier={tier} />
      </div>
    ))}
  </div>
)

export default Subscribe
