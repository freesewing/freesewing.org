import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Robot from '@freesewing/components/Robot'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.thanksForYourSupport')}>
      <Robot size={300} pose="yay" />
      <p>
        <Button variant="contained" color="primary" size="large" href="/share/">
          <FormattedMessage id="app.share" />
        </Button>
      </p>
      <Blockquote type="tip">
        <Link to="/contact/">
          <FormattedMessage id="app.patronHelp" />
        </Link>
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
