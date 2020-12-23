import React, { useState } from 'react'
import Logo from '@freesewing/components/Logo'
import Mdx from '../../mdx'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

import './splash.scss'

const Splash = ({ app, uiMdx }) => {
  const [reveal, setReveal] = useState(false)

  const toggleReveal = (group) => {
    if (reveal === group) setReveal(false)
    else setReveal(group)
  }

  const maker = (
    <div
      key="maker"
      className={`maker poh ${reveal === 'maker' ? 'active' : ''}`}
      onClick={() => toggleReveal('maker')}
    >
      <h3>For makers</h3>
      <p>
        All our sewing patterns are made-to-measure &amp; free to use, courtesy of our community
      </p>
    </div>
  )
  const designer = (
    <div
      key="designer"
      className={`designer poh ${reveal === 'designer' ? 'active' : ''}`}
      onClick={() => toggleReveal('designer')}
    >
      <h3>For designers</h3>
      <p>Find out how parametric design is different, and what that means for you as a designer</p>
    </div>
  )
  const developer = (
    <div
      key="developer"
      className={`developer poh ${reveal === 'developer' ? 'active' : ''}`}
      onClick={() => toggleReveal('developer')}
    >
      <h3>For developers</h3>
      <p>
        FreeSewing is written in JavaScript. We have guides and docs for beginners and experts alike
      </p>
    </div>
  )
  const groups = []

  if (app.mobile) {
    if (!reveal) groups.push(maker, designer, developer)
    else {
      if (reveal === 'maker') groups.push(maker)
      else if (reveal === 'designer') groups.push(designer)
      else if (reveal === 'developer') groups.push(developer)
    }
  } else {
    groups.push(maker, designer, developer)
  }

  return (
    <div className="splash">
      <div className="top">
        <div className="logo">
          <Logo size={166} />
          <div className="name">
            <span className="free">Free</span>Sewing
          </div>
        </div>
        <div className="slogan">
          Come for the sewing patterns
          <br />
          Stay for the community
        </div>
      </div>
      <div className="groups">{groups}</div>
      {reveal && (
        <div className={`details ${reveal ? reveal : ''}`}>
          <Mdx node={uiMdx[`homepage/${reveal}s`]} />
          <div className="close-button">
            <Button onClick={() => setReveal(false)} color="primary" variant="contained">
              <FormattedMessage id="app.close" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Splash
