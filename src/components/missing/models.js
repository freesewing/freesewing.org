import React from 'react'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const MissingModels = props => (
  <Blockquote type="note" style={{ textAlign: 'center', maxWidth: '800px' }}>
    <h6>
      <FormattedMessage id="app.modelFirst" />
    </h6>
    <p>
      <FormattedMessage id="app.noModel" />
    </p>
    <p>
      <FormattedMessage id="app.noModel2" />
    </p>
    <p>
      <Button variant="contained" color="primary" size="large" href="/model/">
        <FormattedMessage id="app.newModel" />
      </Button>
    </p>
  </Blockquote>
)

export default MissingModels
