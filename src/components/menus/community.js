import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import HeartIcon from '@material-ui/icons/Favorite'

const CommunityMenu = ({ app }) => {
  const style = {
    wrapper: {
      padding: app.mobile ? '0' : '0 1rem',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '600px'
    },
    col: {
      padding: '0 0.5rem'
    },
    patterns: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    pattern: {
      padding: '0 0.5rem 0 0',
      display: 'inline-block'
    },
    link: {
      textDecoration: 'none',
      color: app.theme === 'dark' ? '#74c0fc' : '#228be6'
    },
    button: {
      marginTop: '1rem'
    }
  }

  return (
    <div style={style.wrapper} className={`style-wrapper ${app.theme}`}>
      <div style={style.col}>
        <h6>freesewing.org</h6>
        <ul className="links">
          <li>
            <Link to="/blog/">
              <FormattedMessage id="app.blog" />
            </Link>
            : <FormattedMessage id="intro.txt-blog" />
          </li>
          <li>
            <Link to="/showcase/">
              <FormattedMessage id="app.showcase" />
            </Link>
            : <FormattedMessage id="intro.txt-showcase" />
          </li>
          <li>
            <Link to="/patrons/">
              <FormattedMessage id="app.ourPatrons" />
            </Link>
            : <FormattedMessage id="account.patronInfo" />
          </li>
        </ul>
      </div>
      <div style={style.col}>
        <h6>
          <FormattedMessage id="app.socialMedia" />
        </h6>
        <ul className="links">
          <li>
            Twitter:
            <a href="https://twitter.com/freesewing_org">&nbsp;@freesewing_org</a>
          </li>
          <li>
            Instagram:
            <a href="https://instagram.com/freesewing_org">&nbsp;@freesewing_org</a>
          </li>
          <li>
            Gitter chat rooms: &nbsp; <a href="https://gitter.im/freesewing.org/chat">chat</a>
            &nbsp; <a href="https://gitter.im/freesewing.org/help">help</a>
            &nbsp; <a href="https://gitter.im/freesewing.org/development">development</a>
            &nbsp; <a href="https://gitter.im/freesewing.org/translation">translation</a>
            &nbsp; <a href="https://gitter.im/freesewing.org/design">design</a>
          </li>
        </ul>
      </div>
      <div
        style={{
          ...style.col,
          width: '100%'
        }}
      >
        <h6>
          <FormattedMessage id="app.supportFreesewing" />
        </h6>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{
            ...style.button,
            marginBottom: '1rem'
          }}
          href="/patrons/join/"
        >
          <HeartIcon style={{ marginRight: '1rem', color: '#e64980' }} />
          <FormattedMessage id="app.becomeAPatron" />
          <HeartIcon style={{ marginLeft: '1rem', color: '#e64980' }} />
        </Button>
      </div>
    </div>
  )
}

export default CommunityMenu
