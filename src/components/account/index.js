import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import LoginRequired from '../login-required'
import AccountMenu from './menu'
import AccountSettings from './settings'
import AccountAvatar from './avatar'
import AccountBio from './bio'
import AccountLanguage from './language'
import AccountUnits from './units'
import AccountSocial from './social'
import AccountEmail from './email'
import AccountUsername from './username'
import AccountPassword from './password'
import AccountExport from './export'
import AccountConsent from './consent'
import AccountRestrict from './restrict'

const Account = props => {
  useEffect(() => {
    let crumbs = {
      account: { slug: '/account', title: <FormattedMessage id="app.account" /> },
      settings: { slug: '/account/settings', title: <FormattedMessage id="app.settings" /> }
    }
    switch (props.slug) {
      case '/account/settings':
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'app.settings'}))
        props.app.frontend.setCrumbs([crumbs.account])
        break
      case '/account/settings/avatar':
      case '/account/settings/bio':
      case '/account/settings/language':
      case '/account/settings/units':
      case '/account/settings/github':
      case '/account/settings/twitter':
      case '/account/settings/instagram':
      case '/account/settings/email':
      case '/account/settings/username':
      case '/account/settings/password':
        let topic = props.slug.split('/').pop()
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'account.' + topic}))
        props.app.frontend.setCrumbs([crumbs.account, crumbs.settings])
        break
      case '/account/export':
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'account.exportYourData'}))
        props.app.frontend.setCrumbs([crumbs.account])
        break
      case '/account/consent':
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'account.reviewYourConsent'}))
        props.app.frontend.setCrumbs([crumbs.account])
        break
      case '/account/restrict':
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'account.restrictProcessingOfYourData'}))
        props.app.frontend.setCrumbs([crumbs.account])
        break
      default:
        props.app.frontend.setTitle(props.app.frontend.intl.formatMessage({id:'app.account'}))
        props.app.frontend.setCrumbs([])
    }
  }, [props.slug])

  let main
  switch (props.slug) {
    case '/account/settings':
      main = <AccountSettings app={props.app} />
      break
    case '/account/settings/avatar':
      main = <AccountAvatar app={props.app} />
      break
    case '/account/settings/bio':
      main = <AccountBio app={props.app} />
      break
    case '/account/settings/language':
      main = <AccountLanguage app={props.app} />
      break
    case '/account/settings/units':
      main = <AccountUnits app={props.app} />
      break
    case '/account/settings/github':
      main = <AccountSocial type="github" app={props.app} />
      break
    case '/account/settings/twitter':
      main = <AccountSocial type="twitter" app={props.app} />
      break
    case '/account/settings/instagram':
      main = <AccountSocial type="instagram" app={props.app} />
      break
    case '/account/settings/email':
      main = <AccountEmail app={props.app} />
      break
    case '/account/settings/username':
      main = <AccountUsername app={props.app} />
      break
    case '/account/settings/password':
      main = <AccountPassword app={props.app} />
      break
    case '/account/export':
      main = <AccountExport app={props.app} />
      break
    case '/account/consent':
      main = <AccountConsent app={props.app} />
      break
    case '/account/restrict':
      main = <AccountRestrict app={props.app} />
      break
    default:
      main = (
        <AccountMenu
          mobile={props.app.frontend.mobile}
          username={props.app.account.username}
          app={props.app}
        />
      )
  }

  return <LoginRequired page={props.slug}>{main}</LoginRequired>
}

export default Account
