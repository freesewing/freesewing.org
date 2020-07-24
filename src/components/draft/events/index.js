import React from 'react'
import Event from './event'

const DraftEvents = ({ events, app, debug = false }) => {
  const types = ['error', 'warning']
  if (debug) types.push('debug')

  return (
    <div className="draft-events">
      {types.map((type) => (
        <div className={`events-${type}`}>
          {events[type].map((event, index) => (
            <Event event={event} type={type} key={index} app={app} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default DraftEvents
