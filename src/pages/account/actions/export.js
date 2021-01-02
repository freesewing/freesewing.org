import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import AccountContext from '../../../components/context/account'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.exportYourData')}
      {...app.treeProps(props.path)}
    >
      <p>
        <FormattedMessage id="account.exportYourDataTitle" />
      </p>
      <p>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
          data-test="cancel"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="export"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={app.exportAccount}
        >
          <FormattedMessage id="account.exportYourData" />
        </Button>
      </p>
      <Blockquote type="note">
        <FormattedMessage
          id="account.exportYourDataInfo"
          values={{ em: (...chunks) => <em>{chunks}</em> }}
        />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
