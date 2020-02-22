import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ app }) => {
  let url = null
  if (typeof window !== 'undefined') url = <meta property="og:url" content={window.location.href} />
  return (
    <Helmet>
      <title>{app.title}</title>
      <meta name="description" content={app.description} />
      <meta property="og:title" content={app.title} />
      <meta property="og:description" content={app.description} />
      <meta property="og:image" content="https://freesewing.org/share/en.wide.jpg" />
      {url}
      <meta name="twitter:title" content={app.title} />
      <meta name="twitter:description" content={app.description} />
      <meta name="twitter:image" content="https://freesewing.org/share/en.wide.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default Meta
