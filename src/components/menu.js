import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby"
import { FormattedMessage } from "react-intl";
import LightModeIcon from "@material-ui/icons/Brightness3";
import DarkModeIcon from "@material-ui/icons/WbSunny";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Translate";
import Button from "@material-ui/core/Button";

const Menu = props => {
	const data = useStaticQuery(graphql`
		{
		  allSitePage(filter: {path: {in: [
				"/start",
        "/concepts",
        "advanced",
				"/api",
        "/plugins",
        "/packages",
        "/repos"
			]}}) { edges { node { path, context { node { frontmatter { title } } } } }
		  }
		}`);
  const styles = {
    menu: {
      width: "calc(100% - 4rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    icon: {
      marginRight: "1rem"
    },
    button: {
      marginBottom: "1rem"
    },
    links: {
      marginTop: "2rem"
    },
    link: {
      fontSize: "1.25rem",
      display: "block",
      width: "100%",
      textAlign: "center"
    }
  }
  const themeIcons = {
    light: <LightModeIcon style={styles.icon} />,
    dark: <DarkModeIcon style={styles.icon} />
  }

  return (
    <div style={styles.menu}>
      <Button fullWidth={true} variant="outlined" color="primary" style={styles.button} size="large" onClick={props.toggleDarkMode}>
        {themeIcons[props.theme]}
        <FormattedMessage id="app.darkMode" />
      </Button>
      <Button
        fullWidth={true}
        variant="outlined"
        color="primary"
        style={styles.button}
        size="large"
        href="/languages"
      >
        <LanguageIcon style={styles.icon}/>
        <FormattedMessage id="account.language" />
      </Button>
      <div style={styles.links}>
        <Link style={styles.link} to="/"><HomeIcon /></Link>
        {data.allSitePage.edges.map(e => {
          return <Link key={e.node.path} style={styles.link} to={e.node.path}>{e.node.context.node.frontmatter.title}</Link>
        })
        }
      </div>
    </div>
  );
};

export default Menu;
