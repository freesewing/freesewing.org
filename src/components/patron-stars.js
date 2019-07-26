import React from "react";

const PatronStars = props => {
  let stars = [];
  if (['2','4','8'].indexOf(props.tier+'') === -1) return null;
  for (let i=0;i<parseInt(props.tier/2);i++) {
    stars.push(<span role="img" aria-label="*" key={props.tier+"-"+i}>🌟</span>);
  }
  return stars;
}

export default PatronStars;
