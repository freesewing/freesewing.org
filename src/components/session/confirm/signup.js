import React, { useState } from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AccountConsent = ({ app, confirmationId }) => {
  const [details, setDetails] = useState(false);
  const [profile, setProfile] = useState(false);
  const [model, setModel] = useState(false);
  const [openData, setOpenData] = useState(true);

  const createAccount = () => {
    if (profile) {
      let consent = {
        profile,
        model,
        openData
      }
      app.backend.createAccount(confirmationId, consent, setResult);
    }
  }

  const setResult = (one, two) => {
    console.log('set result', one, two);
  }

  const styles = {
    table: {
      padding: 0,
      borderCollapse: "collapse",
    },
    cell: {
      padding: "1rem",
      borderTop: "1px solid #9993",
      verticalAlign: "top",
    },
    question: {
      textAlign: "right",
      fontWeight: "bold",
    },
    side: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    }
  }

  const profileDetails = [
    <h2><FormattedMessage id="gdpr.consentForProfileData" /></h2>,
    <table style={styles.table} className="font-title">
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.profileWhatQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileWhatAnswer" />
          <br />
          <FormattedHTMLMessage id="gdpr.profileWhatAnswerOptional" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.whyQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileWhyAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.timingQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.shareQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileShareAnswer" />
        </td>
      </tr>
    </table>
  ];
  const modelDetails = [
    <h2><FormattedMessage id="gdpr.consentForModelData" /></h2>,
    <table style={styles.table} className="font-title">
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.modelWhatQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.modelWhatAnswer" />
          <br />
          <FormattedHTMLMessage id="gdpr.modelWhatAnswerOptional" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.whyQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.modelWhyAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
          <FormattedMessage id="gdpr.timingQuestion" />
        </td>
        <td style={styles.cell}>
          <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
        </td>
      </tr>
      <tr style={styles.row}>
        <td style={{...styles.cell, ...styles.question}}>
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
  ];

  return (
    <React.Fragment>
      <Blockquote type="note">
      <p><FormattedMessage id="gdpr.compliant" /></p>
      </Blockquote>
      <p><FormattedHTMLMessage id="gdpr.consentWhyAnswer" /></p>
      {details ? profileDetails : null}
      <h5><FormattedMessage id="gdpr.profileQuestion" /></h5>
      <div style={styles.side}>
        <FormControlLabel
          control={<Checkbox color="primary" onChange={() => setProfile(!profile)}/>}
          value={profile}
          checked={profile ? true : false}
          label={app.frontend.intl.formatMessage({ id: "gdpr.yesIDo"})}
        />
        { profile
          ? null
          : <Blockquote type="note">
            <FormattedMessage id="gdpr.noConsentNoAccount" />
          </Blockquote>
        }
      </div>
      {details ? modelDetails : null}
      <h5><FormattedMessage id="gdpr.modelQuestion" /></h5>
      <div style={styles.side}>
        <FormControlLabel
          control={<Checkbox color="primary" onChange={() => setModel(!model)}/>}
          value={model}
          checked={model ? true : false}
          label={app.frontend.intl.formatMessage({ id: "gdpr.yesIDo"})}
        />
        { model
          ? null
          : <Blockquote type="note">
            <FormattedMessage id="gdpr.noConsentNoPatterns" />
          </Blockquote>
        }
      </div>
      { details ? (
        <div style={{marginLeft: "2rem"}}>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setOpenData(!openData)}/>}
            value={true}
            checked={openData ? true : false}
            label={app.frontend.intl.formatMessage({ id: "gdpr.openDataQuestion"})}
          />
        { openData
          ? null
          : <p style={{marginTop: 0}}><small><FormattedMessage id="gdpr.openDataInfo" /></small></p>
        }
        </div>
      ) : null }


      <p style={{textAlign: app.frontend.mobile ? "left" : "right"}}>
        <Button
          style={{marginLeft: '1rem'}}
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => setDetails(!details)}
        >
          <FormattedMessage id={"app." + (details ? "hide" : "show") + "Details"} />
        </Button>
        <Button
          size="large"
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          onClick={createAccount}
          disabled={!profile}
        >
          <FormattedMessage id="gdpr.createMyAccount" />
        </Button>
      </p>

    </React.Fragment>
  );
}
export default AccountConsent;
