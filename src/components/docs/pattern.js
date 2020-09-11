import React from 'react'
import { FormattedMessage } from 'react-intl'
import capitalize from '@freesewing/utils/capitalize'
import { Link } from 'gatsby'
import PatternOptions from './pattern-options'
import PatternMeasurements from './pattern-measurements'
import Button from '@material-ui/core/Button'
import PlayIcon from '@material-ui/icons/PlayArrow'
import Hashtag from '../hashtag'

const PatternIndexPage = (props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '1rem'
        }}
      >
        <p>
          <FormattedMessage id={'patterns.' + props.pattern + '.description'} />
        </p>
        <div>
          <Button
            style={{ marginRight: '1rem' }}
            color="primary"
            variant="contained"
            size="large"
            href={'/create/' + props.pattern + '/'}
          >
            <PlayIcon style={{ marginRight: '1rem' }} />
            <FormattedMessage
              id="app.newThing"
              values={{
                thing: [capitalize(props.pattern), ' ', <FormattedMessage id={`app.pattern`} />]
              }}
            />
          </Button>
          <p>
            <Hashtag
              tag={`FreeSewign${capitalize(props.pattern)}`}
              title={`${capitalize(props.pattern)} Hashtag`}
            />
          </p>
        </div>
      </div>
      <h2>
        <FormattedMessage id="app.patternInstructions" />
      </h2>
      <ul className="links">
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/cutting/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.cutting" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/fabric/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.fabricOptions" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/instructions/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.instructions" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/needs/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.whatYouNeed" />
          </Link>
        </li>
      </ul>
      <h2>
        <FormattedMessage id="app.patternOptions" />
      </h2>
      <PatternOptions pattern={props.pattern} />
      <h2>
        <FormattedMessage id="app.requiredMeasurements" />
      </h2>
      <PatternMeasurements pattern={props.pattern} app={props.app} />
      <h2>
        <FormattedMessage id="app.examples" />
      </h2>
      <p>
        <FormattedMessage id="intro.txt-showcase" />:
      </p>
      <ul className="links">
        <li>
          <Link to={'/showcase/designs/' + props.pattern}>
            <FormattedMessage id="app.showcase" /> / {capitalize(props.pattern)}
          </Link>
        </li>
      </ul>
    </>
  )
}

export default PatternIndexPage
