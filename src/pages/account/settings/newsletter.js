import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Page = (props) => {
  // Hooks
  const app = useApp()

  // State
  const [newsletter, setNewsletter] = useState(app.account.newsletter || false)

  // Methods
  const toggleNewsletter = () => {
    let newVal = !newsletter
    setNewsletter(newVal)
    app.updateAccount([newVal, 'newsletter'], '/account/settings/')
  }

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.newsletter')}
      {...app.treeProps(props.path)}
    >
      <h5>
        <FormattedMessage id="account.newsletterTitle" />
      </h5>
      <RadioGroup name="profile" onChange={toggleNewsletter} value={newsletter}>
        <FormControlLabel
          data-test="noIDoNot"
          control={<Radio color="primary" />}
          value={false}
          checked={newsletter ? false : true}
          label={app.translate('gdpr.noIDoNot')}
        />
        <FormControlLabel
          data-test="yesIDo"
          control={<Radio color="primary" />}
          value={true}
          checked={newsletter ? true : false}
          label={app.translate('gdpr.yesIDo')}
        />
      </RadioGroup>
    </AppWrapper>
  )
}

export default Page
