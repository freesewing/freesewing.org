import React from "react";
import Grid from "@material-ui/core/Grid";
import Oauth from "./Oauth";

const Providers = props => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      wrap="wrap"
      spacing={24}
    >
      <Grid item xs={12} sm={props.fullWidth ? 12 : 6}>
        <Oauth
          provider="github"
          login={props.login}
          language={props.language}
        />
      </Grid>
      <Grid item xs={12} sm={props.fullWidth ? 12 : 6}>
        <Oauth
          provider="google"
          login={props.login}
          language={props.language}
        />
      </Grid>
    </Grid>
  );
};

export default Providers;
