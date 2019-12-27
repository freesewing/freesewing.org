import React from 'react'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'

const AccountMenu = ({ app }) => {
  const style = {
    wrapper: {
      padding: '0 1rem',
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
        <h6>
          <FormattedMessage id="app.create" />
        </h6>
        <ul className="links">
          <li>
            <Link to="/create/">
              <FormattedMessage
                id="app.newPattern"
                values={{ pattern: app.translate('app.pattern') }}
              />
            </Link>
          </li>
          <li>
            <Link to="/model/">
              <FormattedMessage
                id="app.newModel"
                values={{ pattern: app.translate('app.model') }}
              />
            </Link>
          </li>
        </ul>
        <h6>
          <FormattedMessage id="app.browse" />
        </h6>
        <ul className="links">
          <li>
            <Link to="/patterns/">
              <FormattedMessage id="app.patterns" />
            </Link>
          </li>
          <li>
            <Link to="/models/">
              <FormattedMessage id="app.models" />
            </Link>
          </li>
          <li>
            <Link to={`/users/${app.account.username}/`}>
              <FormattedMessage id="app.profile" />
            </Link>
          </li>
        </ul>
        <h6>
          <FormattedMessage id="app.various" />
        </h6>
        <ul className="links">
          <li>
            <Link to="/logout/">
              <FormattedMessage id="app.logOut" />
            </Link>
          </li>
          <li>
            <Link to="/account/">
              <FormattedMessage id="app.account" />
            </Link>
          </li>
        </ul>
      </div>
      <div style={style.col}>
        <h6>
          <FormattedMessage id="app.settings" />
        </h6>
        <ul className="links">
          {['avatar', 'bio', 'language', 'units', 'github', 'instagram', 'twitter'].map(setting => (
            <li>
              <Link to={`/account/settings/${setting}/`}>
                <FormattedMessage id={`account.${setting}`} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={style.col}></div>
    </div>
  )
}

export default AccountMenu
