import React, { useState } from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import SizingTable from '../components/size-table'
import SizingGraph from '../components/person/size-graph'
import BreadCrumbs from '../components/breadcrumbs'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Icon from '@freesewing/components/Icon'

const Page = (props) => {
  const app = useApp(false)

  const [breasts, setBreasts] = useState(true)
  const [chart, setChart] = useState(false)
  const title = app.translate('app.sizes')

  return (
    <AppWrapper app={app} title={title} noLayout>
      <div
        style={{
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          paddingBottom: '3rem',
        }}
      >
        <BreadCrumbs app={props.app} pageTitle={title} />
        <h1>{title}</h1>
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            margin: '0',
            padding: '1rem',
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={breasts}
                onChange={() => setBreasts(!breasts)}
                name="breasts"
                inputProps={{ 'aria-label': app.translate('app.breasts') }}
                color="primary"
              />
            }
            label={<Icon icon={breasts ? 'withBreasts' : 'withoutBreasts'} />}
          />
          <FormControlLabel
            control={
              <Switch
                checked={chart}
                onChange={() => setChart(!chart)}
                name="chart"
                inputProps={{ 'aria-label': '📉' }}
                color="primary"
              />
            }
            label={chart ? '📉' : '📄'}
          />
        </div>
        {chart ? <SizingGraph breasts={breasts} app={app} /> : <SizingTable breasts={breasts} />}
      </div>
    </AppWrapper>
  )
}

export default Page
