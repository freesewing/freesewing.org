import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Blockquote from "@freesewing/components/Blockquote";
import { FormattedMessage } from "react-intl";
import PatronStars from "../patron-stars";
import UserSocial from "../user-social";

const JoinPatrons = props => {
  const handleResult = (result, data) => {
    if (result) {
      setPatrons(data);
    } else {
      // FIXME: Handle error
    }
  }
  const [patrons, setPatrons] = useState({2: {}, 4: {}, 8: {}});
  useEffect(() => {
    props.app.backend.loadPatrons(handleResult);
  }, []);

  const renderPatronTier = tier => {
    let list = [];
    for (let id in patrons[tier]) {
      let patron = patrons[tier][id];
      list.push(
        <div key={patron.handle} style={styles.patron}>
          <Link to={"/users/"+patron.username}>
            <img style={styles.avatar} src={patron.pic} alt={patron.username} className="shadow"/>
          </Link>
          <div style={styles.username}>{patron.username}</div>
          <div style={styles.social}>
            <UserSocial accounts={patron.social} />
          </div>
        </div>
      );
    }
    return (
      <div key={tier}>
        <h2>
          <FormattedMessage id={"app.patron-"+tier} />
          <small> <PatronStars tier={tier} /> </small>
        </h2>
        <div style={styles.list}>
          {list}
        </div>
      </div>
    );
  }

  const styles = {
    patron: {
      width: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "2rem",
    },
    avatar: {
      width: "calc(100% - 15px)",
      borderRadius: "50%",
      background: "#000",
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    username: {
      fontWeight: "bold",
      fontFamily: "'Roboto Condensed', sans-serif",
      margin: "0.5rem 0",
    },
  }
  return (
    <React.Fragment>
      {[2,4,8].map( tier => renderPatronTier(tier))}
      <Blockquote type="note">
        <FormattedMessage id="account.patronInfo" />
      </Blockquote>
    </React.Fragment>
  );
}

export default JoinPatrons;
