import React from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

import Subscribe from '../components/subscribe'
import Mdx from '../components/mdx'

// Style
import './homepage.css'

const HomePage = props => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  return (
    <AppWrapper app={app}>
      <div id="homepage">
        {/* Top banner */}
        <header>
          <div className="banner">
            <div className="text-block">
              <h1>FreeSewing</h1>
              <h2>
                <FormattedMessage id="app.sewingPatternsForNonAveragePeople" />
                <sup>*</sup>
                <br />
                <small>
                  <small data-test="subslogan">
                    * <FormattedMessage id="app.averagePeopleDoNotExist" />
                  </small>
                </small>
              </h2>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                className="btn-primary"
                href={
                  app.account.patron
                    ? '/share/'
                    : app.account.username
                    ? '/patrons/join/'
                    : '/create/'
                }
              >
                {app.account.patron ? (
                  <FormattedMessage id="app.share" />
                ) : app.account.username ? (
                  <FormattedMessage id="app.subscribe" />
                ) : (
                  <FormattedMessage id="app.browsePatterns" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* First row of text boxes */}
        <WideLayout app={app} noTitle>
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row1-' + id}>
                <Mdx node={uiMdx[`homepage/row-1/${id}`]} />
              </div>
            ))}
          </div>
        </WideLayout>

        {/* Support banner */}
        <div className="stripe">
          <div>
            <h1>
              <FormattedMessage id="app.supportFreesewing" />
            </h1>
            <h2>
              <FormattedMessage id="app.txt-tiers" />
            </h2>
            <p>
              <FormattedMessage id="app.patronPitch" />
            </p>
            <Button className="btn-primary" variant="contained" href="#tiers">
              <FormattedMessage id="app.pricing" />
            </Button>
          </div>
        </div>

        <WideLayout app={app} noTitle>
          {/* Pricing */}
          <h3 className="pricing">
            <FormattedMessage id="app.pricing" />
          </h3>
          <Subscribe showFree={false} app={app} />
          {/* Second row of text boxes */}
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row2-' + id}>
                <Mdx node={uiMdx[`homepage/row-2/${id}`]} />
              </div>
            ))}
          </div>
        </WideLayout>
      </div>
    </AppWrapper>
  )
}

export default withLanguage(HomePage)
