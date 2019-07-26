import React from "react";
import FooterBase from "@freesewing/components/Footer";
import { useStaticQuery, graphql, Link } from "gatsby"

const Footer = props => {
	const data = useStaticQuery(graphql`
		{
      allFsPatron {
        edges {
          node {
            patron {
              username
              pic { xs }
            }
          }
        }
      }
		}`
  );
  const styles = {
    ul: {
      margin: "2rem auto",
      padding: 0,
      maxWidth: "666px"

    },
    li: {
      display: "inline",
      listStyleType: "none",
    },
    img: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#000",
      margin: "2px",
      border: "1px solid #fff6"
    }
  }

  const patrons = [];
  data.allFsPatron.edges.map( node => {
    let patron = node.node.patron;
    patrons.push(
      <li key={patron.username} style={styles.li}>
        <Link to={"/users/"+patron.username} title={patron.username}>
          <img src={patron.pic.xs} alt={patron.username} style={styles.img}/>
        </Link>
      </li>
    );
  });

  const allPatrons = <ul style={styles.ul}>{patrons}</ul>

  const links = {
    left: {
      blog: "/blog",
      aboutFreesewing: "/docs/about",
      faq: "/docs/faq"
    },
    right: {
      becomeAPatron: "/patrons/join",
      makerDocs: "/docs",
      devDocs: "https://" + props.language + ".freesewing.dev/"
    }
  }

  return <FooterBase language={props.language} links={links} home="/" patrons={allPatrons} />
}

export default Footer;

