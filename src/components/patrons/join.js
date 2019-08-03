import React from 'react'
import Subscribe from '../subscribe'

const JoinPatrons = props => (
  <Subscribe noFree mobile={props.app.frontend.tablet || props.app.frontend.mobile} />
)

export default JoinPatrons
