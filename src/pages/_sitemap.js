import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'
import Layout from '../components/layouts/default'
import PatronStars from '../components/patron-stars'
import { list as patterns } from '@freesewing/pattern-info'
import { Link, graphql } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const Page = (props) => {
  const app = useApp()
  useEffect(() => {
    app.setTitle(app.translate('app.sitemap'))
    app.setContext(context)
  }, [])

  const styles = {
    url: {
      display: 'block',
      margin: '0 0 0.25rem 1rem',
      fontSize: '0.9rem',
      color: app.theme === 'dark' ? 'white' : 'black'
    }
  }

  const main = {
    '#account': 'app.account',
    '#blog': 'app.blog',
    '#docs': 'app.docs',
    '#patrons': 'app.patrons',
    '#patterns': 'app.patterns',
    '#showcase': 'app.showcase'
  }

  const context = [
    <h5>
      <FormattedMessage id="app.sitemap" />
    </h5>,
    <ul>
      {Object.keys(main).map((i) => (
        <li key={i}>
          <a href={i}>{app.translate(main[i])}</a>
        </li>
      ))}
    </ul>
  ]

  const renderMdxList = (pages) => {
    let links = []
    for (let slug in pages) {
      let p = pages[slug]
      links.push(
        <li key={p.slug}>
          <Link to={p.slug}>
            {p.title}
            <span style={styles.url}>{p.slug}</span>
          </Link>
        </li>
      )
    }

    return <ul className="links">{links}</ul>
  }

  const renderMdxTree = (pages) => {
    let links = []
    for (let slug in pages) {
      let p = pages[slug]
      links.push(
        <li key={p.slug}>
          <Link to={p.slug}>
            {p.title}
            <span style={styles.url}>{p.slug}</span>
          </Link>
          {p.offspring && renderMdxTree(p.offspring)}
        </li>
      )
    }

    return <ul className="links">{links}</ul>
  }

  return (
    <AppWrapper app={app}>
      <Layout app={app}>
        <ul className="links">
          {Object.keys(main).map((i) => (
            <li key={i}>
              <a href={i}>{app.translate(main[i])}</a>
            </li>
          ))}
        </ul>

        <h2 id="account">
          <Link to="/account/">
            <FormattedMessage id="app.account" />
          </Link>
        </h2>
        <ul className="links">
          <li>
            <Link to="/welcome/">
              <FormattedMessage id="app.welcome" />
              <span style={styles.url}>/welcome/</span>
            </Link>
          </li>
          <li>
            <Link to="/patterns/">
              <FormattedMessage id="app.patterns" />
              <span style={styles.url}>/patterns/</span>
            </Link>
          </li>
          <li>
            <Link to="/create/">
              <FormattedMessage
                id="app.newThing"
                values={{ thing: app.translate('app.pattern') }}
              />
              <span style={styles.url}>/create/</span>
            </Link>
          </li>
          <li>
            <Link to="/people/">
              <FormattedMessage id="app.people" />
              <span style={styles.url}>/people/</span>
            </Link>
          </li>
          <li>
            <Link to="/person/">
              <FormattedMessage id="app.addThing" values={{ thing: app.translate('app.person') }} />
              <span style={styles.url}>/person/</span>
            </Link>
          </li>
          <li>
            <Link to="/login/">
              <FormattedMessage id="app.logIn" />
              <span style={styles.url}>/login/</span>
            </Link>
          </li>
          <li>
            <Link to="/logout/">
              <FormattedMessage id="app.logOut" />
              <span style={styles.url}>/logout/</span>
            </Link>
          </li>
          <li>
            <Link to="/account/settings/">
              <FormattedMessage id="app.settings" />
              <span style={styles.url}>/account/settings/</span>
            </Link>
            <ul className="links">
              <li>
                <Link to="/account/settings/avatar/">
                  <FormattedMessage id="account.avatar" />
                  <span style={styles.url}>/account/settings/avatar/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/bio/">
                  <FormattedMessage id="account.bio" />
                  <span style={styles.url}>/account/settings/bio/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/language/">
                  <FormattedMessage id="account.language" />
                  <span style={styles.url}>/account/settings/language/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/units/">
                  <FormattedMessage id="account.units" />
                  <span style={styles.url}>/account/settings/units/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/github/">
                  <FormattedMessage id="account.github" />
                  <span style={styles.url}>/account/settings/github/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/instagram/">
                  <FormattedMessage id="account.instagram" />
                  <span style={styles.url}>/account/settings/instagram/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/twitter/">
                  <FormattedMessage id="account.twitter" />
                  <span style={styles.url}>/account/settings/twitter/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/email/">
                  <FormattedMessage id="account.email" />
                  <span style={styles.url}>/account/settings/email/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/username/">
                  <FormattedMessage id="account.username" />
                  <span style={styles.url}>/account/settings/username/</span>
                </Link>
              </li>
              <li>
                <Link to="/account/settings/password/">
                  <FormattedMessage id="account.password" />
                  <span style={styles.url}>/account/settings/password/</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/account/export/">
              <FormattedMessage id="account.exportYourData" />
              <span style={styles.url}>/account/export/</span>
            </Link>
          </li>
          <li>
            <Link to="/account/consent/">
              <FormattedMessage id="account.reviewYourConsent" />
              <span style={styles.url}>/account/consent/</span>
            </Link>
          </li>
          <li>
            <Link to="/account/restrict/">
              <FormattedMessage id="account.restrictProcessingOfYourData" />
              <span style={styles.url}>/account/restrict/</span>
            </Link>
          </li>
          <li>
            <Link to="/account/remove/">
              <FormattedMessage id="account.removeYourAccount" />
              <span style={styles.url}>/account/remove/</span>
            </Link>
          </li>
        </ul>

        <h2 id="blog">
          <Link to="/blog/">
            <FormattedMessage id="app.blog" />
          </Link>
        </h2>
        {renderMdxList(props.pageContext.blog)}

        <h2 id="docs">
          <Link to="/docs/">
            <FormattedMessage id="app.docs" />
          </Link>
        </h2>
        {renderMdxTree(props.pageContext.tree.docs.offspring)}

        <h2 id="patrons">
          <Link to="/patrons/">
            <FormattedMessage id="app.patrons" />
          </Link>
        </h2>
        <ul className="links">
          {[8, 4, 2].map((tier) => (
            <li key={tier}>
              <PatronStars tier={tier} />
              <ul className="links">
                {props.data[`patrons${tier}`].edges.map((edge) => (
                  <li key={edge.node.patron.username}>
                    <Link to={`/users/${edge.node.patron.username}/`}>
                      {edge.node.patron.username}
                      <span style={styles.url}>{`/users/${edge.node.patron.username}/`}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h2 id="patterns">
          <Link to="/patterns/">
            <FormattedMessage id="app.patterns" />
          </Link>
        </h2>
        <ul className="links">
          {patterns.map((p) => (
            <li key={p}>
              <Link to={`/designs/${p}`}>
                {app.translate(`patterns.${p}.title`)}
                <span style={styles.url}>{`/designs/${p}/`}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 id="showcase">
          <Link to="/showcase/">
            <FormattedMessage id="app.showcase" />
          </Link>
        </h2>
        {renderMdxList(props.pageContext.showcase)}
        <h3>
          <Link to="/showcase/designs/">
            <FormattedMessage id="app.showcase" />: <FormattedMessage id="app.designs" />
          </Link>
        </h3>
        <ul className="links">
          {patterns.map((p) => (
            <li key={p}>
              <Link to={`/showcase/designs/${p}`}>
                {app.translate(`patterns.${p}.title`)}
                <span style={styles.url}>{`/showcase/designs/${p}/`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    patrons8: allFsPatron(filter: { patron: { tier: { eq: "8" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
    patrons4: allFsPatron(filter: { patron: { tier: { eq: "4" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
    patrons2: allFsPatron(filter: { patron: { tier: { eq: "2" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
  }
`
