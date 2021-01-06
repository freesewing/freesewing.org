import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()

  const issues =
    'https://github.com/freesewing/freesewing/issues?q=is%3Aissue+label%3A%22%3Atv%3A+fscc%22'

  return (
    <AppWrapper app={app} title="Contributor calls" {...app.treeProps(props.path)}>
      <p>
        We hold regular <em>Contributor Calls</em>, an online gathering with FreeSewing contributors
        and community members.
      </p>
      <p>
        It's a moment to discuss the things we are working on, the challenges and opportunities we
        are facing, or to coordinate teamwork or collaborations.
      </p>
      <p>
        Everybody is free to join the call, you are welcome to chime in, but it's also fine to dial
        in to listen only.
      </p>
      <h5>Planning</h5>
      <p>
        We have a call on the Saturday of <b>odd weeks</b> at 17:00 UTC.
        <br />
        <small>
          <a href="#timezones">See what that means for your time zone</a>
        </small>
      </p>
      <h5>Agenda and notes</h5>
      <p>
        To find out when the next call is, see its agenda (or propose agenda items), or see notes of
        previous calls, look for <a href={issues}>issues tagged `fscc` on Github</a>.
      </p>
      <h5>How to connect</h5>
      <p>
        We use Zoom for the call, and you can join at{' '}
        <a href="https://meet.freesewing.org">meet.freesewing.org</a>.
      </p>
      <h5 id="timezones">Contributor call in various timezones</h5>
      <ul className="links">
        <li>
          Los Angeles: <span className="fw-300">Saturday at 09:00</span>
        </li>
        <li>
          Chicago: <span className="fw-300">Saturday at 11:00</span>
        </li>
        <li>
          New York: <span className="fw-300">Saturday at 12:00</span>
        </li>
        <li>
          São Paulo: <span className="fw-300">Saturday at 14:00</span>
        </li>
        <li>
          London: <span className="fw-300">Saturday at 17:00</span>
        </li>
        <li>
          Paris: <span className="fw-300">Saturday at 18:00</span>
        </li>
        <li>
          Johannesburg: <span className="fw-300">Saturday at 18:00</span>
        </li>
        <li>
          Moscow: <span className="fw-300">Saturday at 20:00</span>
        </li>
        <li>
          Mumbai: <span className="fw-300">Saturday at 22:30</span>
        </li>
        <li>
          Hong Kong: <span className="fw-300">Sunday at 01:00</span>
        </li>
        <li>
          Tokyo: <span className="fw-300">Sunday at 02:00</span>
        </li>
        <li>
          Sydney: <span className="fw-300">Sunday at 04:00</span>
        </li>
      </ul>
    </AppWrapper>
  )
}

export default Page
