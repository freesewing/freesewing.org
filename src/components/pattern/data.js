import React from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-yaml'
import yaml from 'yaml'

/*
 * We're wrapping this in an extra diff to prevent
 * flexbox messing with the ::before content added via CSS
 */

const PatternData = (props) => (
  <div>
    <div className="gatsby-highlight">
      <pre className="language-yaml">
        <code
          className="language-yaml"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              yaml.stringify(props.data || null),
              Prism.languages.yaml,
              'yaml'
            )
          }}
        />
      </pre>
    </div>
  </div>
)

export default PatternData
