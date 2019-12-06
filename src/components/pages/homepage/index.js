import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Subscribe from '../../subscribe'
import { list as patternList } from '@freesewing/pattern-info'
import { Link } from 'gatsby'
import patternsImage from './patterns.jpg'
import showcasesImage from './showcases.jpg'
import blogpostsImage from './blogposts.jpg'
import getStyles from './styles'

const HomePage = ({ app }) => {
  app.frontend.setLayout = 'home'
  const styles = getStyles(app.frontend.tablet, app.frontend.mobile)
  let mainButton
  if (app.account.patron) {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/share"
        variant="contained"
        style={styles.primaryButton}
        data-test-data="top-button-patron"
      >
        <FormattedMessage id="app.share" />
      </Button>
    )
  } else if (app.account.username) {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/patrons/join"
        variant="contained"
        style={styles.primaryButton}
        data-test="top-button-user"
      >
        <FormattedMessage id="app.subscribe" />
      </Button>
    )
  } else {
    mainButton = (
      <Button
        size="large"
        color="secondary"
        href="/signup"
        variant="contained"
        style={styles.primaryButton}
        data-test="top-button-visitor"
      >
        <FormattedMessage id="app.signUp" />
      </Button>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <div style={styles.header} data-test="header">
          <div style={styles.innerHeader}>
            <h1 style={styles.h1}>FreeSewing</h1>
            <h2 style={styles.h2} data-test="slogan">
              <FormattedMessage id="app.sewingPatternsForNonAveragePeople" />
              <sup>*</sup>
              <br />
              <small>
                <small data-test="subslogan">
                  * <FormattedMessage id="app.averagePeopleDoNotExist" />
                </small>
              </small>
            </h2>
            {mainButton}
          </div>
        </div>
      </div>
      <div style={styles.boxes}>
        <div style={styles.box} data-test="row1-1">
          <h2 style={styles.h2Box}>
            <FormattedMessage id="homepage.row1col1title" />
          </h2>
          <p>
            <FormattedHTMLMessage id="homepage.row1col1text" />
          </p>
        </div>
        <div style={styles.box} data-test="row1-2">
          <h2 style={styles.h2Box}>
            <FormattedMessage id="homepage.row1col2title" />
          </h2>
          <p>
            <FormattedMessage id="homepage.row1col2text" />
          </p>
        </div>
        <div style={styles.box} data-test="row1-3">
          <h2 style={styles.h2Box}>
            <FormattedMessage id="homepage.row1col3title" />
          </h2>
          <p>
            <FormattedHTMLMessage id="homepage.row1col3text" />
          </p>
        </div>
      </div>

      <div style={styles.stripe} data-test="subscribe">
        <div style={styles.innerHeader}>
          <h1 style={styles.h1}>
            <FormattedMessage id="app.supportFreesewing" />
          </h1>
          <h2 style={styles.h2}>
            <FormattedMessage id="app.txt-tiers" />
          </h2>
          <p style={styles.pitch}>
            <FormattedMessage id="app.patronPitch" />
          </p>
          <Button style={styles.primaryButton} variant="contained" href="#tiers">
            <FormattedMessage id="app.pricing" />
          </Button>
        </div>
      </div>

      <div style={styles.m1} data-test="tiers">
        <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>
          <FormattedMessage id="app.pricing" />
        </h3>
        <Subscribe showFree={true} />
      </div>

      <div style={styles.m1}>
        <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>~~~~</h3>
        <div style={styles.boxes}>
          <div style={styles.card} className="shadow" data-test="patterns">
            <Link to="/patterns" title={app.frontend.intl.formatMessage({ id: 'app.patterns' })}>
              <img
                src={patternsImage}
                style={styles.cardImg}
                alt={app.frontend.intl.formatMessage({ id: 'app.patterns' })}
              />
            </Link>
            <div style={styles.cardText}>
              <Link
                to="/patterns"
                style={{ color: 'inherit' }}
                title={app.frontend.intl.formatMessage({ id: 'app.patterns' })}
              >
                <h4 style={{ margin: 0 }}>
                  <FormattedMessage id="app.patterns" />
                </h4>
              </Link>
              <ul style={styles.patternList}>
                {patternList.map((pattern, index) => (
                  <li style={styles.patternEntry} key={pattern}>
                    <Link to={'/patterns/' + pattern} title={pattern}>
                      {pattern}
                    </Link>
                    {index < patternList.length - 1 ? ', ' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={styles.card} className="shadow" data-test="showcase">
            <Link to="/showcase" title={app.frontend.intl.formatMessage({ id: 'app.showcase' })}>
              <img
                src={showcasesImage}
                style={styles.cardImg}
                alt={app.frontend.intl.formatMessage({ id: 'app.showcase' })}
              />
            </Link>
            <div style={styles.cardText}>
              <h4 style={{ margin: 0 }}>
                <Link
                  to="/showcase"
                  style={{ color: 'inherit' }}
                  title={app.frontend.intl.formatMessage({ id: 'app.showcase' })}
                >
                  <FormattedMessage id="app.showcase" />
                </Link>
              </h4>
              <p style={{ marginTop: '0.5rem' }}>
                <Link
                  to="/showcase"
                  style={{ color: 'inherit' }}
                  title={app.frontend.intl.formatMessage({ id: 'app.showcase' })}
                >
                  <FormattedMessage id="intro.txt-showcase" />
                </Link>
              </p>
            </div>
          </div>

          <div style={styles.card} className="shadow" data-test="blog">
            <Link to="/blog" title={app.frontend.intl.formatMessage({ id: 'app.blog' })}>
              <img
                src={blogpostsImage}
                style={styles.cardImg}
                alt={app.frontend.intl.formatMessage({ id: 'app.patterns' })}
              />
            </Link>
            <div style={styles.cardText}>
              <h4 style={{ margin: 0 }}>
                <Link
                  to="/blog"
                  style={{ color: 'inherit' }}
                  title={app.frontend.intl.formatMessage({ id: 'app.blog' })}
                >
                  <FormattedMessage id="app.blog" />
                </Link>
              </h4>
              <p style={{ marginTop: '0.5rem' }}>
                <Link
                  to="/blog"
                  style={{ color: 'inherit' }}
                  title={app.frontend.intl.formatMessage({ id: 'app.blog' })}
                >
                  <FormattedMessage id="intro.txt-blog" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.boxes}>
        <div style={styles.box} data-test="row2-1">
          <h2>
            <FormattedMessage id="homepage.row2col1title" />
          </h2>
          <p>
            <FormattedHTMLMessage id="homepage.row2col1text" />
          </p>
        </div>
        <div style={styles.box} data-test="row2-2">
          <h2>
            <FormattedMessage id="homepage.row2col2title" />
          </h2>
          <p>
            <FormattedHTMLMessage id="homepage.row2col2text" />
          </p>
        </div>
        <div style={styles.box} data-test="row2-3">
          <h2>
            <FormattedMessage id="homepage.row2col3title" />
          </h2>
          <p>
            <FormattedHTMLMessage id="homepage.row2col3text" />
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
