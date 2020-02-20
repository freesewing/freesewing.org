import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import LoginRequired from '../../components/login-required'

import { FormattedMessage } from 'react-intl'
import ProfileIcon from '@material-ui/icons/Fingerprint'
import SettingsIcon from '@material-ui/icons/Tune'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import PeopleIcon from '@material-ui/icons/PermContactCalendar'
import NewPersonIcon from '@material-ui/icons/PersonAdd'
import RecipesIcon from '@material-ui/icons/FolderOpen'
import NewPatternIcon from '@material-ui/icons/NoteAdd'
import Button from '@material-ui/core/Button'

const AccountPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.account'))
    app.refresh()
  }, [])

  // Styles
  const styles = {
    wrapper: {
      maxWidth: '400px',
      margin: '0 auto 40px'
    },
    icon: {
      marginRight: '0.5rem'
    },
    button: {
      margin: '0 1rem 1rem 0'
    }
  }

  // Menu structure
  const tiles = {
    primary: [
      {
        to: '/create/',
        icon: <NewPatternIcon style={styles.icon} />,
        title: (
          <FormattedMessage id="app.newThing" values={{ thing: app.translate('app.pattern') }} />
        )
      },
      {
        to: '/person/',
        icon: <NewPersonIcon style={styles.icon} />,
        title: (
          <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
        )
      }
    ],
    info: [
      {
        to: '/people/',
        icon: <PeopleIcon style={styles.icon} />,
        title: 'app.people',
        className: 'info'
      },
      {
        to: '/patterns/',
        icon: <RecipesIcon style={styles.icon} />,
        title: 'app.patterns',
        className: 'info'
      }
    ],
    accent: [
      {
        to: '/users/' + app.account.username + '/',
        icon: <ProfileIcon style={styles.icon} />,
        title: 'app.profile'
      },
      {
        to: '/account/settings/',
        icon: <SettingsIcon style={styles.icon} />,
        title: 'app.settings'
      }
    ],
    danger: [
      {
        to: '/logout/',
        icon: <LogoutIcon style={styles.icon} />,
        title: 'app.logOut',
        onClick: () => app.logout(app.account.username)
      }
    ]
  }
  return (
    <LoginRequired app={app}>
      <AppWrapper app={app}>
        <CenteredLayout app={app}>
          {Object.keys(tiles).map(type => {
            let btns = []
            for (let tile of tiles[type])
              btns.push(
                <Button
                  key={tile.to}
                  color="primary"
                  fullWidth
                  style={styles.button}
                  variant="contained"
                  className={type}
                  href={tile.to === '/logout' ? '#' : tile.to}
                  size="large"
                  data-test={tile.to}
                  onClick={tile.to === '/logout' ? tile.onClick : null}
                >
                  {tile.icon}
                  {typeof tile.title === 'string' ? (
                    <FormattedMessage id={tile.title} />
                  ) : (
                    tile.title
                  )}
                </Button>
              )

            return (
              <div key={type} style={styles.wrapper}>
                {btns}
              </div>
            )
          })}
        </CenteredLayout>
      </AppWrapper>
    </LoginRequired>
  )
}

export default withLanguage(AccountPage)
