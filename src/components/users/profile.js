import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Blockquote from "@freesewing/components/Blockquote";
import { FormattedMessage } from "react-intl";
import Icon from "@freesewing/components/Icon";
import Markdown from "react-markdown";

const UserProfile = props => {
  const handleResult = (result, data) => {
    if (result) {
      setUser(data.profile);
    } else {
      // FIXME: Handle error
      console.log(data);
    }
  }
  const [user, setUser] = useState(false);
  useEffect(() => {
    props.app.backend.loadProfile(props.user, handleResult);
  }, []);

  const renderIcon = (handle, service) => {
    if (handle === "") return <Icon icon={service} style={styles.mutedIcon} />
    else return <a href={"https://"+service+".com/"+handle}><Icon icon={service} style={styles.icon}/></a>
  }
  const renderSocial = social => {
    return [
      renderIcon(social.twitter, 'twitter'),
      renderIcon(social.instagram, 'instagram'),
      renderIcon(social.github, 'github'),
    ];
  }
  const renderStars = tier => {
    let stars = [];
    if ([2,4,8].indexOf(tier) === -1) return null;
    for (let i=0;i<parseInt(tier/2);i++) {
      stars.push(<span role="img" aria-label="*" key={tier+"-"+i}>🌟</span>);
    }
    return stars;
  }
  const styles = {
    avatar: {
      background: "#000",
      borderRadius: "4px",
    },
    icon: {
      margin: "0.25rem"
    },
    mutedIcon: {
      margin: "0.25rem",
      opacity: "0.5",
    }
  }
  if (!user) return null;

  return (
    <React.Fragment>
      <h1>
        {user.username}
        <small> {renderStars(user.patron)} </small>
      </h1>
      <img src={user.pictureUris.l} style={styles.avatar} className="shadow"/>
      <Markdown source={user.bio} />
    {renderSocial(user.social)}
    </React.Fragment>
  );
}

export default UserProfile;
