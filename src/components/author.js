import React from 'react'
import Markdown from 'react-markdown'
import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'

const MissingAuthor = (props) => (
  <Blockquote type="fixme">
    <h5>Missing author</h5>
    <p>That's weird. Please let us know about this.</p>
  </Blockquote>
)

const MissingMaker = (props) => (
  <Blockquote type="fixme">
    <h5>Unknown maker</h5>
    <p>This showcase does not have a maker associated with it.</p>
    <p>
      We've moved our showcase posts to a new format and we allow each maker their own little bio to
      go along a post. Unfortunately, this post has not yet have a maker associated with it.
    </p>
    <p>
      We have{' '}
      <a href="https://github.com/freesewing/freesewing/issues/1269">an open issue for this</a>, you
      can comment there to let us know this post still needs to be migrated.
    </p>
  </Blockquote>
)
const Author = (props) => {
  const author = props.author

  if (!author) return props.type === 'showcase' ? <MissingMaker /> : <MissingAuthor />

  return (
    <div
      id="author"
      className="shadow"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        maxWidth: '500px',
        margin: 'auto',
        textAlign: 'center',
        padding: '1rem',
        borderTop: '4px solid',
        borderBottom: '4px solid',
        margin: '4rem auto',
      }}
    >
      <img
        src={`https://posts.freesewing.org${author?.picture?.formats?.xsmall?.url}`}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '100px',
          margin: 'auto',
        }}
        alt={author?.displayname}
      />
      <h5>
        <span style={{ fontSize: '60%', display: 'block' }}>
          {props.type === 'blog' ? 'written by' : 'made by'}
        </span>
        {author?.displayname}
      </h5>
      <div>
        <Markdown>{author?.about}</Markdown>
      </div>
    </div>
  )
}

export default Author
