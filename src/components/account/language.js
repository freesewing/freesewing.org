import React, { useState, useContext } from 'react'
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import { languages } from "@freesewing/i18n";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AccountLanguage = props => {
  const app = useContext(AppContext);
  const [language, setLanguage] = useState(app.account.settings.language || 'en');

  const updateLanguage = evt => setLanguage(evt.target.value)

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id="account.languageInfo" />
      </Blockquote>
      <RadioGroup
        name="language"
        onChange={updateLanguage}
        value={language}
      >
        {Object.keys(languages).map((lang, index) => {
          return (
            <FormControlLabel
              control={<Radio color="primary" />}
              value={lang}
              checked={language === lang ? true : false}
              label={app.frontend.intl.formatMessage({ id: "i18n." + lang })+" ("+languages[lang]+")"}
              key={lang}
            />
          );
        })}
      </RadioGroup>
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            {settings: { language: language}},
            app.frontend.intl.formatMessage({id: "account.language"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
};

export default AccountLanguage;
