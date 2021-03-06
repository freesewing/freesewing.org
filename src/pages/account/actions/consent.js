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
  const [details, setDetails] = useState(false)
  const [profile, setProfile] = useState(
    app.account
      ? app.account.consent
        ? app.account.consent.profile
          ? true
          : false
        : false
      : false
  )

  const [measurements, setMeasurements] = useState(
    app.account
      ? app.account.consent
        ? app.account.consent.measurements
          ? true
          : false
        : false
      : false
  )
  const [openData, setOpenData] = useState(
    app.account.consent ? (app.account.consent.openData ? true : false) : false
  )

  // Methods
  const saveConsent = () => {
    if (!profile) app.removeAccount()
    else app.updateAccount([{ profile, measurements, openData }, 'consent'], '/account/settings/')
  }

  // Style
  const styles = {
    table: {
      padding: 0,
      borderCollapse: 'collapse',
    },
    cell: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top',
    },
    question: {
      textAlign: 'right',
      fontWeight: 'bold',
    },
  }

  // react-i18n can be a real pain sometimes
  const bold = {
    b: (...chunks) => <strong>{chunks}</strong>,
  }

  // Detailed info
  const profileDetails = [
    <h2 key="profileTitle" data-test="consentForProfileData">
      <FormattedMessage id="gdpr.consentForProfileData" />
    </h2>,
    <table style={styles.table} key="profileTable">
      <tbody>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="profileWhatQuestion">
            <FormattedMessage id="gdpr.profileWhatQuestion" values={bold} />
          </td>
          <td style={styles.cell} data-test="profileWhatAnswer">
            <FormattedMessage id="gdpr.profileWhatAnswer" values={bold} />
            <br />
            <FormattedMessage id="gdpr.profileWhatAnswerOptional" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="whyQuestion">
            <FormattedMessage id="gdpr.whyQuestion" />
          </td>
          <td style={styles.cell} data-test="profileWhyAnswer">
            <FormattedMessage id="gdpr.profileWhyAnswer" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="timingQuestion">
            <FormattedMessage id="gdpr.timingQuestion" />
          </td>
          <td style={styles.cell} data-test="profileTimingAnswer">
            <FormattedMessage id="gdpr.profileTimingAnswer" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="shareQuestion">
            <FormattedMessage id="gdpr.shareQuestion" />
          </td>
          <td style={styles.cell} data-test="profileShareAnswer">
            <FormattedMessage id="gdpr.profileShareAnswer" values={bold} />
          </td>
        </tr>
      </tbody>
    </table>,
  ]
  const modelDetails = [
    <h2 key="modelTitle" data-test="consentForModelData">
      <FormattedMessage id="gdpr.consentForModelData" />
    </h2>,
    <table style={styles.table} key="modelData">
      <tbody>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="modelWhatQuestion">
            <FormattedMessage id="gdpr.modelWhatQuestion" />
          </td>
          <td style={styles.cell} data-test="modelWhatAnswer">
            <FormattedMessage id="gdpr.modelWhatAnswer" values={bold} />
            <br />
            <FormattedMessage id="gdpr.modelWhatAnswerOptional" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="whyQuestion">
            <FormattedMessage id="gdpr.whyQuestion" />
          </td>
          <td style={styles.cell} data-test="modelWhyAnswer">
            <FormattedMessage id="gdpr.modelWhyAnswer" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="timingQuestion">
            <FormattedMessage id="gdpr.timingQuestion" />
          </td>
          <td style={styles.cell} data-test="profileTimingAnswer">
            <FormattedMessage id="gdpr.profileTimingAnswer" values={bold} />
          </td>
        </tr>
        <tr style={styles.row}>
          <td style={{ ...styles.cell, ...styles.question }} data-test="shareQuestion">
            <FormattedMessage id="gdpr.shareQuestion" />
          </td>
          <td style={styles.cell} data-test="profileShareAnswer">
            <FormattedMessage id="gdpr.profileShareAnswer" values={bold} />
            <br />
            <small data-test="openData">
              <FormattedMessage id="gdpr.openData" />
            </small>
          </td>
        </tr>
      </tbody>
    </table>,
  ]

  return (
    <AppWrapper
      app={app}
      title={app.translate('account.reviewYourConsent')}
      {...app.treeProps(props.path)}
    >
      <Blockquote type="note">
        <p data-test="compliant">
          <FormattedMessage id="gdpr.compliant" />
        </p>
        <p data-test="consentWhyAnswer">
          <FormattedMessage id="gdpr.consentWhyAnswer" />
        </p>
      </Blockquote>
      {details ? profileDetails : null}
      <h5 data-test="profileQuestion">
        <FormattedMessage id="gdpr.profileQuestion" />
      </h5>
      <RadioGroup name="profile" onChange={() => setProfile(!profile)} value={profile}>
        <FormControlLabel
          data-test="noIDoNot"
          control={<Radio color="primary" />}
          value={false}
          checked={profile ? false : true}
          label={app.translate('gdpr.noIDoNot')}
        />
        <FormControlLabel
          data-test="yesIDo"
          control={<Radio color="primary" />}
          value={true}
          checked={profile ? true : false}
          label={app.translate('gdpr.yesIDo')}
        />
      </RadioGroup>
      {profile ? null : (
        <Blockquote type="warning" data-test="profileWarning">
          <FormattedMessage id="gdpr.profileWarning" />
        </Blockquote>
      )}

      {details ? modelDetails : null}
      <h5 data-test="modelQuestion">
        <FormattedMessage id="gdpr.modelQuestion" />
      </h5>
      <RadioGroup name="model" onChange={() => setMeasurements(!measurements)} value={measurements}>
        <FormControlLabel
          data-test="noIDoNot"
          control={<Radio color="primary" />}
          value={false}
          checked={measurements ? false : true}
          label={app.translate('gdpr.noIDoNot')}
        />
        <FormControlLabel
          data-test="yesIDo"
          control={<Radio color="primary" />}
          value={true}
          checked={measurements ? true : false}
          label={app.translate('gdpr.yesIDo')}
        />
      </RadioGroup>
      {details ? (
        <div style={{ marginLeft: '2rem' }}>
          <FormControlLabel
            data-test="openDataQuestion"
            control={<Checkbox color="primary" onChange={() => setOpenData(!openData)} />}
            value={true}
            checked={openData ? true : false}
            label={app.translate('gdpr.openDataQuestion')}
          />
          {openData ? null : (
            <p style={{ marginTop: 0 }}>
              <small data-test="openDataInfo">
                <FormattedMessage id="gdpr.openDataInfo" />
              </small>
            </p>
          )}
        </div>
      ) : null}

      {measurements ? null : (
        <Blockquote type="warning" data-test="modelWarning">
          <FormattedMessage id="gdpr.modelWarning" />
        </Blockquote>
      )}

      <p style={{ textAlign: app.mobile ? 'left' : 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
          data-test="cancel"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="details"
          style={{ marginLeft: '1rem' }}
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => setDetails(!details)}
        >
          <FormattedMessage id={'app.' + (details ? 'hide' : 'show') + 'Details'} />
        </Button>
        <Button
          data-test="save"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={saveConsent}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </AppWrapper>
  )
}

export default Page
