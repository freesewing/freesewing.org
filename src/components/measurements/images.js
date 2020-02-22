import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import breastsImages from './breasts/'
import nobreastsImages from './nobreasts/'
import MeasurementImage from './image'
import { injectIntl } from 'react-intl'

const MeasurementImages = props => {
  const { measurement, intl, breasts } = props
  if (!measurement) return null
  // Set tab to 0 with model that has breasts or 1 for no breasts
  // Default to breasts
  const [tab, setTab] = useState(breasts == false ? 1 : 0)
  const toggleTab = () => setTab(tab === 0 ? 1 : 0)

  const seated = ['seatdepth']
  const breastsOnly = [
    'bustspan',
    'bustfront',
    'highbust',
    'highbustfront',
    'highpointshouldertobust',
    'naturalwaisttounderbust',
    'underbust'
  ]
  const bg =
    '/model-' +
    (tab === 0 ? '' : 'no') +
    'breasts-' +
    (seated.indexOf(measurement.toLowerCase()) !== -1 ? 'seated' : 'standing') +
    '.jpg'
  const img =
    tab === 0
      ? breastsImages[measurement.toLowerCase()]
      : nobreastsImages[measurement.toLowerCase()]

  if (breastsOnly.indexOf(measurement.toLowerCase()) !== -1)
    return (
      <MeasurementImage measurement={measurement} breasts={true} intl={intl} bg={bg} img={img} />
    )
  else
    return (
      <div data-test="measurement-images">
        <Tabs
          value={tab}
          onChange={toggleTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={props.intl.formatMessage({ id: 'app.withBreasts' })} />
          <Tab
            label={props.intl.formatMessage({
              id: 'app.withoutBreasts'
            })}
          />
        </Tabs>
        <MeasurementImage
          measurement={measurement}
          breasts={tab === 0 ? true : false}
          intl={props.intl}
          bg={bg}
          img={img}
        />
      </div>
    )
}

export default injectIntl(MeasurementImages)
