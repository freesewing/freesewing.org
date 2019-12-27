import React from 'react'
import Prism from 'prismjs'

/*
 * We're wrapping this in an extra diff to prevent
 * flexbox messing with the ::before content added via CSS
 */

const PatternData = props => (
  <div>
    <div className="gatsby-highlight">
      <pre className="language-json">
        <code
          className="language-json"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              JSON.stringify(props.data || null, null, 2),
              Prism.languages.javascript,
              'javascript'
            )
          }}
        />
      </pre>
    </div>
  </div>
)

export default PatternData
