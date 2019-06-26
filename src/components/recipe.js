import React from "react";
import Prism from "prismjs";

const recipe = props => (
  <div className="gatsby-highlight">
    <pre className="language-json">
      <code
        className="language-json"
        dangerouslySetInnerHTML={{__html: Prism.highlight(JSON.stringify(props.recipe || null, null, 2), Prism.languages.javascript, 'javascript')}}
      />
    </pre>
  </div>
)

export default recipe;
