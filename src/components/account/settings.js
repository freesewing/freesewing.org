import React from 'react'
import { FormattedMessage } from 'react-intl'
import AvatarIcon from '@material-ui/icons/PhotoCamera'
import BioIcon from '@material-ui/icons/ChatBubbleOutline'
import EmailIcon from '@material-ui/icons/Email'
import Icon from '@freesewing/components/Icon'
import LanguageIcon from '@material-ui/icons/Translate'
import PasswordIcon from '@material-ui/icons/VpnKey'
import UnitsIcon from '@material-ui/icons/Straighten'
import UsernameIcon from '@material-ui/icons/Face'
import ExportIcon from '@material-ui/icons/CloudDownload'
import RestrictIcon from '@material-ui/icons/PauseCircleFilled'
import ConsentIcon from '@material-ui/icons/DoneAll'
import RemoveIcon from '@material-ui/icons/DeleteForever'
import Button from '@material-ui/core/Button'

const AccountSettings = props => {
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
  const tiles = {
    basic: [
      {
        to: '/account/settings/avatar',
        icon: <AvatarIcon style={styles.icon} />,
        title: 'account.avatar'
      },
      {
        to: '/account/settings/bio',
        icon: <BioIcon style={styles.icon} />,
        title: 'account.bio'
      },
      {
        to: '/account/settings/language',
        icon: <LanguageIcon style={styles.icon} />,
        title: 'account.language'
      },
      {
        to: '/account/settings/units',
        icon: <UnitsIcon style={styles.icon} />,
        title: 'account.units'
      }
    ],
    info: [
      {
        to: '/account/settings/github',
        icon: <Icon size={24} icon="github" style={styles.icon} />,
        title: 'account.github'
      },
      {
        to: '/account/settings/instagram',
        icon: <Icon size={24} icon="instagram" style={styles.icon} />,
        title: 'account.instagram'
      },
      {
        to: '/account/settings/twitter',
        icon: <Icon size={24} icon="twitter" style={styles.icon} />,
        title: 'account.twitter'
      }
    ],
    accent: [
      {
        to: '/account/settings/email',
        icon: <EmailIcon style={styles.icon} />,
        title: 'account.email'
      },
      {
        to: '/account/settings/username',
        icon: <UsernameIcon style={styles.icon} />,
        title: 'account.username'
      },
      {
        to: '/account/settings/password',
        icon: <PasswordIcon style={styles.icon} />,
        title: 'account.password'
      }
    ],
    success: [
      {
        to: '/account/export',
        icon: <ExportIcon style={styles.icon} />,
        title: 'account.exportYourData'
      },
      {
        to: '/account/consent',
        icon: <ConsentIcon style={styles.icon} />,
        title: 'account.reviewYourConsent'
      }
    ],
    warning: [
      {
        to: '/account/restrict',
        icon: <RestrictIcon style={styles.icon} />,
        title: 'account.restrictProcessingOfYourData'
      }
    ],
    danger: [
      {
        to: '/account/remove',
        icon: <RemoveIcon style={styles.icon} />,
        title: 'account.removeYourAccount'
      }
    ]
  }
  return (
    <React.Fragment>
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
              href={tile.to}
              size="large"
            >
              {tile.icon}
              {typeof tile.title === 'string' ? <FormattedMessage id={tile.title} /> : tile.title}
            </Button>
          )

        return (
          <div key={type} style={styles.wrapper}>
            {btns}
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default AccountSettings
