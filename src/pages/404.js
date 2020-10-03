import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Robot from '@freesewing/components/Robot'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import Icon from '@freesewing/components/Icon'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: '2rem'
    },
    button: {
      height: '64px',
      minWidth: '48%',
      lineHeight: 1,
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    icon: {
      marginRight: '1rem'
    },
    text: {
      marginRight: '1rem'
    },
    muted: {
      opacity: 0.6,
      fontStyle: 'italic'
    }
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('errors.404')}
      description={'404: ' + app.translate('errors.404')}
    >
      <div style={{ textAlign: 'center' }}>
        <Robot size={300} pose="shrug" />
        <h2>404</h2>
      </div>
    </AppWrapper>
  )
}

export default Page
