import React from 'react'

const Contributor = ({ patron, app }) => {
  let stars = []
  for (let i = 0; i < parseInt(patron.tier); i++)
    stars.push(
      <li className="heart" key={i}>
        💖
      </li>
    )

  return (
    <div className="contributor shadow">
      <img src={patron.pictureUris.m} alt={patron.username} />
      <div className="text snug">
        <h5>{patron.username}</h5>
        <ul>
          {patron.social && patron.social.github && (
            <li className="github">
              <a href={`https://github.com/${patron.social.github}`}>@{patron.social.github}</a>
            </li>
          )}
          {patron.social && patron.social.twitter && (
            <li className="twitter">
              <a href={`https://twitter.com/${patron.social.twitter}`}>
                @{patron.social.instagram}
              </a>
            </li>
          )}
          {patron.social && patron.social.instagram && (
            <li className="instagram">
              <a href={`https://instagram.com/${patron.social.instagram}`}>
                @{patron.social.instagram}
              </a>
            </li>
          )}
        </ul>
        <ul>{stars}</ul>
      </div>
    </div>
  )
}

export default Contributor
