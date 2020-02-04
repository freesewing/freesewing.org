import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

import { FormattedMessage } from 'react-intl'
import { languages } from '@freesewing/i18n'
import Button from '@material-ui/core/Button'

import SizingTable from '../components/size-table'

const SizesPage = props => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.sizes'))
  }, [])

  return (
    <AppWrapper app={app}>
      <WideLayout app={app}>
        <ul>
          <li>
            <a href="#with-breasts">
              <FormattedMessage id="app.withBreasts" />
            </a>
          </li>
          <li>
            <a href="#without-breasts">
              <FormattedMessage id="app.withoutBreasts" />
            </a>
          </li>
        </ul>
        <h2 id="with-breasts">
          <FormattedMessage id="app.withBreasts" />
        </h2>
        <SizingTable breasts={true} />
        <h2 id="without-breasts">
          <FormattedMessage id="app.withoutBreasts" />
        </h2>
        <SizingTable breasts={false} />
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(SizesPage)
