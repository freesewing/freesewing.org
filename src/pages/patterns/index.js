import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import usePerson from '../../hooks/usePerson'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import CenteredLayout from '../../components/layouts/centered'
import PostPreview from '../../components/post-preview'

import LineDrawing from '@freesewing/components/LineDrawing'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'
import Markdown from 'react-markdown'
import capitalize from '@freesewing/utils/capitalize'

import './patterns.css'

const PatternsIndexPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.patterns'))
  }, [])


  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top wide>
        <div className='pattern-list'>
        {Object.keys(app.patterns).length > 0 ? (
          Object.keys(app.patterns).map((handle, pattern) => {
            let person = usePerson(app, app.patterns[handle].person)
            let personName = app.patterns[handle].person
            if (person) personName = person.name
            return (
              <div key={handle} className='shadow pattern'>
                <Link to={`/patterns/${handle}/`}>
                  <LineDrawing
                    pattern={
                      app.patterns[handle].data ? app.patterns[handle].data.design : 'aaron'
                    }
                    color={app.theme === 'dark' ? '#f8f9fa' : '#212529'}
                    size={app.mobile ? 92 : 164}
                  />
                  {capitalize(app.patterns[handle].data.design)}
                </Link>
                <div>
                  <h5>
                    <Link to={`/patterns/${handle}/`}>
                      <span>{personName}:</span>
                      {app.patterns[handle].name}
                    </Link>
                  </h5>
                  <div className='notes'>
                    <Markdown source={app.patterns[handle].notes} />
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div>
            <Blockquote type="note">
              <h6>
                <FormattedMessage id="app.createFirst" />
              </h6>
              <p>
                <FormattedMessage id="app.noPattern" />
              </p>
              <p style={{ textAlign: 'right' }}>
                <Button href="/create/" color="primary" variant="contained">
                  <FormattedMessage
                    id="app.newThing"
                    values={{ thing: app.translate('app.pattern') }}
                  />
                </Button>
              </p>
            </Blockquote>
          </div>
        )}
        </div>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatternsIndexPage)
