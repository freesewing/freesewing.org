import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '../../breadcrumbs'
import SignupConfirmation from './signup'
import { navigate } from 'gatsby'

const Confirm = props => {
  const chunks = props.slug.split('/')
  const confirmationId = chunks.pop()
  const confirmationType = chunks.pop()
  useEffect(() => {
    props.app.backend.confirmationLogin(confirmationId)
  }, [props.slug])

  const crumbLib = {
    confirm: { slug: '/confirm', title: <FormattedMessage id="app.pendingConfirmation" /> }
  }

  let main, title, crumbs
  if (confirmationType === 'signup') {
    title = 'app.oneMoreThing'
    crumbs = [crumbLib.confirm]
    main = <SignupConfirmation app={props.app} confirmationId={confirmationId} />
  } else if (confirmationType === 'reset') {
    props.app.frontend.startLoading()
    title = 'app.justAMoment'
    crumbs = [crumbLib.confirm]
    main = null
  } else if (confirmationType === 'email') {
    navigate('/account')
    title = 'app.justAMoment'
    crumbs = [crumbLib.confirm]
    main = null
  } else {
    title = [<FormattedMessage id="errors.404" />]
    crumbs = []
    main = (
      <React.Fragment>
        <p>
          <FormattedMessage id="errors.404" />
        </p>
        <p>
          <FormattedMessage id="errors.confirmationNotFound" />
        </p>
      </React.Fragment>
    )
  }

  let theCrumbs = <Breadcrumbs crumbs={crumbs} pageTitle={<FormattedMessage id="app.signUp" />} />

  return (
    <React.Fragment>
      {theCrumbs}
      <h1>
        <FormattedMessage id={title} />
      </h1>
      {main}
      {theCrumbs}
    </React.Fragment>
  )
}

export default Confirm
