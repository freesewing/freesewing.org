import React from 'react'
import usePerson from '../hooks/usePerson'
import LineDrawing from '@freesewing/components/LineDrawing'
import Markdown from 'react-markdown'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'

const Pattern = ({ app, pattern = false }) => {
  // SSR
  if (!pattern) return null

  let person = usePerson(app, app.patterns[pattern].person)
  let personName = app.patterns[pattern].person
  if (person) personName = person.name

  return (
    <div className="shadow pattern">
      <div className="top">
        <div className="linedrawing">
          <LineDrawing
            pattern={app.patterns[pattern].data ? app.patterns[pattern].data.design : 'aaron'}
            color={app.theme === 'dark' ? '#f8f9fa' : '#212529'}
            size={app.mobile ? 92 : 164}
          />
        </div>
        <div>
          <h5>{capitalize(app.patterns[pattern].data.design)}</h5>
          <h6>
            <span>{personName}:</span>
            {app.patterns[pattern].name}
          </h6>
        </div>
      </div>
      <div className="notes">
        <Markdown>{app.patterns[pattern].notes}</Markdown>
      </div>
      <Link to={`/account/patterns/${pattern}/`} className="link" />
    </div>
  )
}

export default React.memo(Pattern)
