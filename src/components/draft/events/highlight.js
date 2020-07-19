import React from 'react'
import Prism from 'prismjs'

const Highlight = ({ code, lang = 'js', dense = false }) => {
  return (
    <div className={dense ? 'dense event-highlight' : 'event-highlight'}>
      <div className="gatsby-highlight">
        <pre className={'language-' + lang}>
          <code
            className={'language-' + lang}
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.js, lang)
            }}
          />
        </pre>
      </div>
    </div>
  )
}

export default Highlight
