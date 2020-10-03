import React from 'react'
import DebugIcon from '@material-ui/icons/Info'
import InfoIcon from '@material-ui/icons/Stars'
import WarningIcon from '@material-ui/icons/ErrorOutline'
import ErrorIcon from '@material-ui/icons/HighlightOff'
import Markdown from 'react-markdown'
import Highlight from './highlight'

const Event = ({ type, event, app }) => {
  const formatError = (err) => (
    <details>
      <summary>
        <Highlight dense code={`${err.name}: ${err.message}`} lang="js-error" />
      </summary>
      <Markdown
        source={`Error in \`${err.fileName}\` line \`${err.lineNumber}:${err.columnNumber}\``}
        className="react-markdown"
      />
      <Highlight code={err.stack} lang="js-trace" />
    </details>
  )

  const formatObject = (obj) => <Highlight lang="json" code={JSON.stringify(obj, null, 2)} />

  const formatEvent = (e, data = false) => {
    if (!data) data = []
    if (typeof e === 'object') {
      if (e instanceof Error === true) data.push(formatError(e))
      else if (Array.isArray(e)) {
        for (const subevent of e) data.concat(formatEvent(subevent, data))
      } else data.push(formatObject(e))
    } else {
      if (app.intl.messages[e]) e = app.intl.messages[e]
      else if (app.intl.messages[`plugin.${e}`]) e = app.intl.messages[`plugin.${e}`]
      if (type === 'info') data.push(<Markdown source={e} className="react-markdown" />)
      else
        data.push(
          <Markdown
            source={`**${app.translate('app.' + type)}:** ${e}`}
            className="react-markdown"
          />
        )
    }

    return data
  }

  return (
    <div className={`draft-event ${type}`}>
      <div className={`icon ${type}`}>
        {type === 'debug' && <DebugIcon fontSize="small" />}
        {type === 'info' && <InfoIcon fontSize="small" />}
        {type === 'warning' && <WarningIcon fontSize="small" />}
        {type === 'error' && <ErrorIcon fontSize="small" />}
      </div>
      {formatEvent(event)}
    </div>
  )
}

export default Event
