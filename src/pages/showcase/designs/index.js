import React from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import PostPreview from '../../../components/post-preview'
import { graphql, Link } from 'gatsby'
import { list as patternList } from '@freesewing/pattern-info'

const Page = (props) => {
  const app = useApp()

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    img: {
      height: '300px',
      margin: '6px',
      padding: 0,
      borderRadius: '4px',
    },
    link: {
      margin: 0,
      padding: 0,
      height: '312px',
    },
  }
  if (app.mobile || app.tablet) {
    style.img.height = '150px'
    style.link.height = '162px'
  }

  const patterns = {}
  for (let p of patternList) patterns[p] = []
  for (let node of props.data.allShowcasePost.nodes) {
    if (node.post.design1) patterns[node.post.design1].push(node.post)
    if (node.post.design2) patterns[node.post.design2].push(node.post)
    if (node.post.design3) patterns[node.post.design3].push(node.post)
  }

  const title = app.translate('app.showcase') + ': ' + app.translate('app.patterns')

  const renderPatterns = () => {
    let context = [<h5>{title}</h5>]
    let list = []
    let output = []
    for (let pattern in patterns) {
      let showcases = []
      let i = 0
      for (let showcase of patterns[pattern]) {
        showcases.push(
          <Link
            to={`/showcase/${showcase.slug}/`}
            key={`fig-${pattern}-${i}`}
            title={showcase.title}
          >
            <PostPreview
              key={showcase.slug}
              app={app}
              post={showcase}
              type="showcase"
              width={368}
            />
          </Link>
        )
        i++
      }
      if (i > 0) {
        let link = (
          <Link to={`/showcase/designs/${pattern}/`} id={pattern}>
            {app.translate(`patterns.${pattern}.title`)}
          </Link>
        )
        output.push(<h2 key={`h2-${pattern}`}>{link}</h2>)
        output.push(
          <div key={`div-${pattern}`} style={style.wrapper}>
            {showcases}
          </div>
        )
        list.push(<li key={`li-${pattern}`}>{link}</li>)
      }
    }

    context.push(<ul>{list}</ul>)

    return [context, output]
  }

  const [context, output] = renderPatterns()

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.showcase') + ': ' + app.translate('app.patterns')}
      crumbs={[{ title: app.translate('app.showcase'), slug: '/showcase/' }]}
      wide
    >
      <ul className="inline">
        {Object.keys(patterns)
          .filter((p) => patterns[p].length > 0)
          .map((p) => (
            <li key={p}>
              {' '}
              <a href={`#${p}`}>{p}</a>
            </li>
          ))}
      </ul>
      {output}
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allShowcasePost(sort: { order: DESC, fields: order }) {
      nodes {
        post {
          title
          design1
          design2
          design3
          image {
            formats {
              large {
                width
                url
              }
              medium {
                width
                url
              }
              small {
                width
                url
              }
              thumbnail {
                width
                url
              }
            }
          }
          slug
        }
      }
    }
  }
`
