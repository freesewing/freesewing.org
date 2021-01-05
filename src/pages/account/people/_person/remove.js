import React, { useState } from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import Button from '@material-ui/core/Button'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (typeof app.people[props.params.person] === 'undefined') return <p>Hmm...</p>

  const title = 'thing' //app.translate('app.removeThing', { thing: app.people[props.person].name})

  return (
    <AppWrapper
      app={app}
      title={title}
      {...app.treeProps(`/account/people/${props.params.person}/name/`)}
    >
      <p>
        <Button
          data-test="remove"
          className="danger"
          color="primary"
          variant="contained"
          onClick={() => app.removePerson(props.params.person)}
          size="large"
        >
          {title}
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
