import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import Markdown from 'react-markdown'
import UserSocial from '../../components/user-social'
import PatronStars from '../../components/patron-stars'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()

  const user = app.account

  // FIXME: Show something better than nothing in SSR
  if (!user.username) return null

  const styles = {
    table: {
      padding: '0.5rem',
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      whiteSpace: 'nowrap',
      margin: '0',
      width: '100%',
      maxWidth: '666px',
    },
    title: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
      textAlign: 'right',
      fontWeight: 'bold',
    },
    cell: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      whiteSpace: 'wrap',
      verticalAlign: 'top',
    },
    avatar: {
      background: '#000',
      borderRadius: '4px',
    },
  }

  if (app.mobile) styles.table.margin = '0 -1.5rem'

  const fields = {
    username: {
      label: 'account.username',
      value: user.username,
    },
    handle: {
      label: 'app.handle',
      value: user.handle,
    },
    patron: {
      label: 'app.patron',
      value: <PatronStars tier={user.patron} />,
    },
    social: {
      label: 'account.social',
      value: <UserSocial accounts={user.social} size={36} />,
    },
    units: {
      label: 'account.units',
      value:
        user.settings.units === 'metric' ? (
          <FormattedMessage id="app.metricUnits" />
        ) : (
          <FormattedMessage id="app.imperialUnits" />
        ),
    },
    language: {
      label: 'account.language',
      value: <FormattedMessage id={`i18n.${user.settings.language}`} />,
    },
    avatar: {
      label: 'account.avatar',
      value: (
        <img
          src={user.pictureUris.l}
          style={styles.avatar}
          className="shadow"
          alt={user.username}
        />
      ),
    },
    bio: {
      label: 'account.bio',
      value: <Markdown>{user.bio}</Markdown>
    },
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.profile')}
      {...app.treeProps(props.location.pathname)}
    >
      <table style={styles.table} className="font-title">
        <tbody>
          {Object.keys(fields).map((field) => (
            <tr className="hover" key={field}>
              <td style={styles.title}>
                <FormattedMessage id={fields[field].label} />
              </td>
              <td style={styles.cell}>{fields[field].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppWrapper>
  )
}

export default Page
