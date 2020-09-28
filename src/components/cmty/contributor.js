import React from 'react'
import { FormattedMessage } from 'react-intl'

const Contributor = ({ contributor, app }) => (
  <div className="contributor shadow">
    <img src={`/contributors/${contributor.img}`} alt={contributor.name} />
    <div className="text">
      <h5>{contributor.name}</h5>
      <ul>
        {contributor.github && (
          <li className="github">
            <a href={`https://github.com/${contributor.github}`}>@{contributor.github}</a>
          </li>
        )}
        {contributor.discord && <li className="discord">@{contributor.discord}</li>}
      </ul>
      <ul>
        {contributor.tags.map((tag) => (
          <li>
            <FormattedMessage id={`cty.${tag}`} />
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Contributor
