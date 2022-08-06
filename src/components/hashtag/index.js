import React from 'react'
import './hashtag.scss'
import { Link } from 'gatsby'

const Hashtag = ({ tag, title = '' }) => (
  <Link className="hashtag" title={title} to="/community/share/">{`#${tag}`}</Link>
)

export default Hashtag
