import React, { useEffect } from 'react'
import Robot from '@freesewing/components/Robot'
import { FormattedMessage } from 'react-intl'
import Button from "@material-ui/core/Button";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@freesewing/components/Icon';

const LanguagePage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="errors.404" key="msg"/>);
  }, [])
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: "2rem",
    },
    button: {
      height: "64px",
      minWidth: "48%",
      lineHeight: 1,
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon: {
      marginRight: "1rem"
    },
    text: {
      marginRight: "1rem"
    },
    muted: {
      opacity: 0.6,
      fontStyle: "italic"
    }
  }

  return (
    <React.Fragment>
      <div style={{textAlign: "center"}}>
        <Robot size={300} pose="shrug" />
      </div>
      <div style={styles.wrapper}>
        <Button
          style={styles.button}
          variant="contained"
          color="primary"
          href="/"
          size="large"
          fullWidth
        >
          <HomeIcon />
          <FormattedMessage id="app.home"/>
        </Button>
        <Button
          style={styles.button}
          variant="outlined"
          color="primary"
          href="/search"
          size="large"
        >
          <SearchIcon />
          <FormattedMessage id="app.search"/>
        </Button>
        <Button
          style={styles.button}
          variant="outlined"
          color="primary"
          href="https://github.com/freesewing/freesewing.dev/issues/new?title=Broken%20link%20on%20freesewing.dev&body=Please%20include%20the%20URL%20of%20the%20page%20that%20has%20the%20broken%20link%20on%20it"
          size="large"
        >
          <Icon type="github" />
          <FormattedMessage id="app.reportBrokenLink"/>
        </Button>
      </div>
    </React.Fragment>
  )
}

export default LanguagePage
