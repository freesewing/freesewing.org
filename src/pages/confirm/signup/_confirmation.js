import React, { useEffect, useState } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import CenteredLayout from '../../../components/layouts/centered'

import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const SignupConfirmationPage = props => {
  // Hooks
  const app = useApp()

  // State
  const [details, setDetails] = useState(false)
  const [profile, setProfile] = useState(false)
  const [model, setModel] = useState(false)
  const [openData, setOpenData] = useState(true)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.oneMoreThing'))
  }, [])

  // Methods
  const createAccount = () => {
    if (profile) {
      let consent = {
        profile,
        model,
        openData
      }
      app.createAccount(props.confirmation, consent)
    }
  }

  // Style
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
    },
    side: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }

  // Content
  const profileDetails = [
    <h2 key="pdtitle">
      <FormattedMessage id="gdpr.consentForProfileData" />
    </h2>,
    <table style={styles.table} className="font-title" key="pdtable">
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
    <h2 key="mdtitle">
      <FormattedMessage id="gdpr.consentForModelData" />
    </h2>,
    <table style={styles.table} className="font-title" key="mdtable">
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
    <AppWrapper app={app}>
      <CenteredLayout app={app}>
        <p>
          <FormattedMessage id="gdpr.compliant" />
        </p>
        <p>
          <FormattedHTMLMessage id="gdpr.consentWhyAnswer" />
        </p>
        {details ? profileDetails : null}
        <h5>
          <FormattedMessage id="gdpr.profileQuestion" />
        </h5>
        <div style={styles.side}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setProfile(!profile)} />}
            value={profile}
            checked={profile ? true : false}
            label={app.translate('gdpr.yesIDo')}
          />
          {profile ? null : (
            <Blockquote type="note">
              <FormattedMessage id="gdpr.noConsentNoAccount" />
            </Blockquote>
          )}
        </div>
        {details ? modelDetails : null}
        <h5>
          <FormattedMessage id="gdpr.modelQuestion" />
        </h5>
        <div style={styles.side}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setModel(!model)} />}
            value={model}
            checked={model ? true : false}
            label={app.translate('gdpr.yesIDo')}
          />
          {model ? null : (
            <Blockquote type="note">
              <FormattedMessage id="gdpr.noConsentNoPatterns" />
            </Blockquote>
          )}
        </div>
        {details ? (
          <div style={{ marginLeft: '2rem' }}>
            <FormControlLabel
              control={<Checkbox color="primary" onChange={() => setOpenData(!openData)} />}
              value={true}
              checked={openData ? true : false}
              label={app.translate('gdpr.openDataQuestion')}
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

        <p style={{ textAlign: app.mobile ? 'left' : 'right' }}>
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
            onClick={createAccount}
            disabled={!profile}
          >
            <FormattedMessage id="gdpr.createMyAccount" />
          </Button>
        </p>
      </CenteredLayout>
    </AppWrapper>
  )
}

export default withLanguage(SignupConfirmationPage)
