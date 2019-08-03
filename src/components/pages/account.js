import React from 'react'
import Layout from '../layout'
import TopicsToc from '../topics-toc'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Account from '../account/index.js'

const LogoutPage = props => {
  const mobile = useMediaQuery('(max-width:599px)')

  const styles = {
    body: {
      maxWidth: '42em',
      margin: 'auto'
    }
  }
  const menu = (
    <TopicsToc
      slug={props.pageContext.slug}
      topicsToc={props.pageContext.topicsToc}
      topics={props.pageContext.topics}
      order={props.pageContext.topicsOrder}
    />
  )

  return (
    <Layout
      topics={props.pageContext.topics}
      topicsToc={props.pageContext.topicsToc}
      menu={menu}
      mobile={mobile}
    >
      <div className="fs-sa">
        <section>
          <article style={styles.body}>
            <Account slug={'/' + props['*']} />
          </article>
        </section>
        {mobile ? null : (
          <aside>
            <div className="sticky">{menu}</div>
          </aside>
        )}
      </div>
    </Layout>
  )
}

export default LogoutPage
