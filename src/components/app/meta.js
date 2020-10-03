import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = (props) => {
  const dflt = {
    title: 'FreeSewing',
    description: 'We are a community of makers. We provide made-to-measure sewing patterns',
    image: 'https://freesewing.org/splash.png'
  }

  const title = props.title || dflt.title
  const description = props.description || dflt.description
  const image = props.image || dflt.image
  const url =
    typeof window !== 'undefined' ? <meta property="og:url" content={window.location.href} /> : null

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url}
      <meta property="og:site_name" content="FreeSewing" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default Meta
