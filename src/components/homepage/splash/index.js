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

  const boxes = {}
  for (let role of ['maker', 'designer', 'developer']) {
    boxes[role] = (
      <div
        key={role}
        className={`${role} poh ${reveal === role ? 'active' : ''}`}
        onClick={() => toggleReveal(role)}
      >
        <Mdx node={uiMdx[`splash/${role}`]} />
      </div>
    )
  }

  const groups = []
  if (app.mobile) {
    if (!reveal) groups.push(boxes.maker, boxes.designer, boxes.developer)
    else groups.push(boxes[reveal])
  } else groups.push(boxes.maker, boxes.designer, boxes.developer)

  return (
    <div className="splash">
      <div className="top">
        <div className="logo">
          <Logo size={app.mobile ? 96 : 166} />
          <div className="name">
            <span className="free">Free</span>Sewing
          </div>
        </div>
        <div className="slogan">
          <FormattedMessage id="app.slogan-come" />
          <br />
          <FormattedMessage id="app.slogan-stay" />
        </div>
      </div>
      <div className="groups">{groups}</div>
      {reveal && (
        <div className={`details ${reveal ? reveal : ''}`}>
          <Mdx node={uiMdx[`homepage/${reveal}s`]} />
          <div className="close-button">
            <Button onClick={() => setReveal(false)} color="secondary" variant="outlined">
              <FormattedMessage id="app.close" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Splash
