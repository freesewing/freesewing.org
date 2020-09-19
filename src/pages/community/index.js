import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import useUiMdx from '../../hooks/useUiMdx'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import Layout from '../../components/layouts/default'
import Blockquote from '@freesewing/components/Blockquote'
import Mdx from '../../components/mdx'
import contributors from '../../../contributors.yaml'
import Contributor from '../../components/contributor'
import { FormattedMessage } from 'react-intl'

const CommunityPage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.community'))
  }, [])

  const context = [
    <h5>
      <FormattedMessage id="app.community" />
    </h5>,
    <h6>
      <a href="#where">
        <FormattedMessage id="cty.whereToFindUs" />
      </a>
    </h6>,
    <ul>
      {['Discord', 'Facebook', 'Github', 'Instagram', 'Reddit', 'Twitter', 'YouTube', 'Zoom'].map(
        (p) => (
          <li key={p}>
            <a href={`#${p.toLowerCase()}`}>{p}</a>
          </li>
        )
      )}
    </ul>
  ]

  const renderContributors = () => {
    let markup = []
    for (const tag of contributors.tags) {
      markup.push(
        <h3 id={tag.tolowercase}>
          <FormattedMessage id={`cty.${tag}`} />
        </h3>
      )
      for (const person of contributors.people) {
        if (person.tags.indexOf(tag) !== -1)
          markup.push(<Contributor contributor={person} app={app} />)
      }
    }

    return markup
  }

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="community" text context={context}>
        <ul className="links">
          <li>
            <a href="#where">
              <FormattedMessage id="cty.whereToFindUs" />
            </a>
          </li>
          <li>
            <a href="#who">
              <FormattedMessage id="cty.whoWeAre" />
            </a>
          </li>
        </ul>
        <Blockquote type="tip">
          <Mdx node={uiMdx[`community/hashtag`]} />
        </Blockquote>

        <h2 id="where">
          <FormattedMessage id="cty.whereToFindUs" />
        </h2>
        <Mdx node={uiMdx[`community/where`]} />

        <h2 id="who">
          <FormattedMessage id="cty.whoWeAre" />
        </h2>
        <Mdx node={uiMdx[`community/who`]} />
        {renderContributors()}
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(CommunityPage)
