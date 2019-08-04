import React, { useState } from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const AccountConsent = ({ app }) => {
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
  const [model, setModel] = useState(
    app.account ? (app.account.consent ? (app.account.consent.model ? true : false) : false) : false
  )
  const [openData, setOpenData] = useState(
    app.account.consent
      ? app.account.consent.model
        ? true
        : false
      : false
  )

  const saveConsent = () => {
    if (!profile) {
      // have it your way
      app.backend.removeAccount()
    }
    let consent = {
      profile,
      model,
      openData
    }
    app.backend.saveAccount(
      { consent: consent },
      app.frontend.intl.formatMessage({ id: 'gdpr.consent' })
    )
  }

  const styles = {
    table: {
      padding: 0,
      borderCollapse: 'collapse'
    },
    cell: {
      padding: '1rem',
      borderTop: '1px solid #9993',
      verticalAlign: 'top'
    },
    question: {
      textAlign: 'right',
      fontWeight: 'bold'
    }
  }

  const profileDetails = [
    <h2 key="profileTitle">
      <FormattedMessage id="gdpr.consentForProfileData" />
    </h2>,
    <table style={styles.table} className="font-title" key="profileTable">
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.profileWhatQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileWhatAnswer" />
          <br />
          <FormattedHTMLMessage id="gdpr.profileWhatAnswerOptional" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.whyQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileWhyAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.timingQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.shareQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileShareAnswer" />
        </td>
      </tr>
    </table>
  ]
  const modelDetails = [
    <h2 key="modelTitle">
      <FormattedMessage id="gdpr.consentForModelData" />
    </h2>,
    <table style={styles.table} className="font-title" key="modelData">
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.modelWhatQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.modelWhatAnswer" />
          <br />
          <FormattedHTMLMessage id="gdpr.modelWhatAnswerOptional" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.whyQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.modelWhyAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.timingQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{ ...styles.cell, ...styles.question }}>
          <FormattedMessage id="gdpr.shareQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileShareAnswer" />
          <br />
          <small>
            <FormattedMessage id="gdpr.openData" />
          </small>
        </td>
      </tr>
    </table>
  ]

  return (
    <React.Fragment>
      <Blockquote type="note">
        <p>
          <FormattedMessage id="gdpr.compliant" />
        </p>
        <p>
          <FormattedHTMLMessage id="gdpr.consentWhyAnswer" />
        </p>
      </Blockquote>
      {details ? profileDetails : null}
      <h5>
        <FormattedMessage id="gdpr.profileQuestion" />
      </h5>
      <RadioGroup name="profile" onChange={() => setProfile(!profile)} value={profile}>
        <FormControlLabel
          control={<Radio color="primary" />}
          value={false}
          checked={profile ? false : true}
          label={app.frontend.intl.formatMessage({ id: 'gdpr.noIDoNot' })}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          value={true}
          checked={profile ? true : false}
          label={app.frontend.intl.formatMessage({ id: 'gdpr.yesIDo' })}
        />
      </RadioGroup>
      {profile ? null : (
        <Blockquote type="warning">
          <FormattedMessage id="gdpr.profileWarning" />
        </Blockquote>
      )}

      {details ? modelDetails : null}
      <h5>
        <FormattedMessage id="gdpr.modelQuestion" />
      </h5>
      <RadioGroup name="model" onChange={() => setModel(!model)} value={model}>
        <FormControlLabel
          control={<Radio color="primary" />}
          value={false}
          checked={model ? false : true}
          label={app.frontend.intl.formatMessage({ id: 'gdpr.noIDoNot' })}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          value={true}
          checked={model ? true : false}
          label={app.frontend.intl.formatMessage({ id: 'gdpr.yesIDo' })}
        />
      </RadioGroup>
      {details ? (
        <div style={{ marginLeft: '2rem' }}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setOpenData(!openData)} />}
            value={true}
            checked={openData ? true : false}
            label={app.frontend.intl.formatMessage({ id: 'gdpr.openDataQuestion' })}
          />
          {openData ? null : (
            <p style={{ marginTop: 0 }}>
              <small>
                <FormattedMessage id="gdpr.openDataInfo" />
              </small>
            </p>
          )}
        </div>
      ) : null}

      {model ? null : (
        <Blockquote type="warning">
          <FormattedMessage id="gdpr.modelWarning" />
        </Blockquote>
      )}

      <p style={{ textAlign: app.frontend.mobile ? 'left' : 'right' }}>
        <Button size="large" variant="outlined" color="primary" href="/account/settings">
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          style={{ marginLeft: '1rem' }}
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => setDetails(!details)}
        >
          <FormattedMessage id={'app.' + (details ? 'hide' : 'show') + 'Details'} />
        </Button>
        <Button
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={saveConsent}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  )
}
export default AccountConsent
