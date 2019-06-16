import React from "react";

const Avatar = props => {
  const style = {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    background: "#495057",
  }
  return <img src={props.data.pictureUris.m} style={style} className="shadow" alt="🙂"/>
}

export default Avatar;
