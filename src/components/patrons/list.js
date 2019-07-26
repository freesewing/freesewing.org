import React from "react";
import Blockquote from "@freesewing/components/Blockquote";
import { FormattedMessage } from "react-intl";
import PatronStars from "../patron-stars";
import UserSocial from "../user-social";
import { useStaticQuery, graphql, Link } from "gatsby"

const JoinPatrons = props => {
	const data = useStaticQuery(graphql`
		{
      allFsPatron {
        edges {
          node {
            patron {
              username
              pic { m }
              social {
                twitter
                instagram
                github
              }
              handle
              tier
            }
          }
        }
      }
		}`
  );

  const styles = {
    patron: {
      width: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "2rem",
      textAlign: "center",
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
      margin: "-0.5rem 0 0.5rem 0",
    },
  }
  const patrons = {};
  data.allFsPatron.edges.map( node => patrons[node.node.patron.username] = node.node.patron );

  const order = Object.keys(patrons);
  order.sort()
  const list = [];
  order.map( username => {
    let patron = patrons[username];
    list.push(
      <div key={patron.handle} style={styles.patron}>
        <Link to={"/users/"+patron.username}>
          <img style={styles.avatar} src={patron.pic.m} alt={patron.username} className="shadow"/>
        </Link>
        <div><PatronStars tier={patron.tier} /></div>
        <div style={styles.username}>{patron.username}</div>
        <div style={styles.social}>
          <UserSocial accounts={patron.social} />
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={styles.list}>
        {list}
      </div>
      <Blockquote type="note">
        <FormattedMessage id="account.patronInfo" />
      </Blockquote>
    </React.Fragment>
  );
}

export default JoinPatrons;
