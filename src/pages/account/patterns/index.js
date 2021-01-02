import React from 'react'
import useApp from '../../../hooks/useApp'
import usePerson from '../../../hooks/usePerson'
import AppWrapper from '../../../components/app/wrapper'

import LineDrawing from '@freesewing/components/LineDrawing'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'
import Markdown from 'react-markdown'
import capitalize from '@freesewing/utils/capitalize'
import './patterns.css'

const Page = (props) => {
  const app = useApp()

  const newPatternButton = (
    <Button href="/create/" color="primary" variant="contained">
      <FormattedMessage
        id="app.newThing"
        values={{
          thing: app.translate('app.pattern')
        }}
      />
    </Button>
  )

  // When there is at least one pattern present
  const listState = (
    <>
      <p>{newPatternButton}</p>
      {Object.keys(app.patterns).map((handle, pattern) => {
        let person = usePerson(app, app.patterns[handle].person)
        let personName = app.patterns[handle].person
        if (person) personName = person.name
        return (
          <div key={handle} className="shadow pattern">
            <Link to={`/account/patterns/${handle}/`}>
              <LineDrawing
                pattern={app.patterns[handle].data ? app.patterns[handle].data.design : 'aaron'}
                color={app.theme === 'dark' ? '#f8f9fa' : '#212529'}
                size={app.mobile ? 92 : 164}
              />
              {capitalize(app.patterns[handle].data.design)}
            </Link>
            <div>
              <h5>
                <Link to={`/account/patterns/${handle}/`}>
                  <span>{personName}:</span>
                  {app.patterns[handle].name}
                </Link>
              </h5>
              <div className="notes">
                <Markdown source={app.patterns[handle].notes} />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )

  // When there are no patterns
  const blankState = (
    <div>
      <Blockquote type="note">
        <h6>
          <FormattedMessage id="app.createFirst" />
        </h6>
        <p>
          <FormattedMessage id="app.noPattern" />
        </p>
        <p>{newPatternButton}</p>
      </Blockquote>
    </div>
  )

  return (
    <AppWrapper app={app} title={app.translate('app.patterns')} {...app.treeProps(props.path)}>
      <div className="pattern-list">
        {Object.keys(app.patterns).length > 0 ? listState : blankState}
      </div>
    </AppWrapper>
  )
}

export default Page
