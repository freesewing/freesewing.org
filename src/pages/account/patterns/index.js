import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import Pattern from '../../../components/pattern'
import '../../../components/pattern.scss'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title={app.translate('app.patterns')} {...app.treeProps(props.path)} wide>
      <Button href="/create/" color="primary" variant="contained">
        <FormattedMessage
          id="app.newThing"
          values={{
            thing: app.translate('app.pattern')
          }}
        />
      </Button>
      {Object.keys(app.patterns).length > 0 ? (
        <div className="pattern-list">
          {Object.keys(app.patterns).map((handle, pattern) => (
            <Pattern key={handle} app={app} pattern={handle} />
          ))}
        </div>
      ) : (
        <Blockquote type="note">
          <h6>
            <FormattedMessage id="app.createFirst" />
          </h6>
          <p>
            <FormattedMessage id="app.noPattern" />
          </p>
        </Blockquote>
      )}
    </AppWrapper>
  )
}

export default Page
