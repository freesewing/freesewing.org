import React from 'react'
import useApp from '../../../../hooks/useApp'
import AppWrapper from '../../../../components/app/wrapper'

import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import { graphql, Link } from 'gatsby'
import PatronStars from '../../../../components/patron-stars'
import UserSocial from '../../../../components/user-social'

const Page = (props) => {
  const app = useApp()

  const styles = {
    patron: {
      width: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    avatar: {
      width: 'calc(100% - 15px)',
      borderRadius: '50%',
      background: '#000',
    },
    list: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    username: {
      fontWeight: 500,
      margin: '-0.5rem 0 0.5rem 0',
    },
  }

  // Preprocess data
  const patrons = {}
  props.data.allFsPatron.edges.map(
    (node) => (patrons[node.node.patron.username] = node.node.patron)
  )
  const order = Object.keys(patrons)
  order.sort()
  const list = []
  order.map((username) => {
    let patron = patrons[username]
    list.push(
      <div key={patron.handle} style={styles.patron}>
        <Link to={'/users/' + patron.username} style={{ width: '100%' }}>
          <img
            style={styles.avatar}
            src={patron.pictureUris.m}
            alt={patron.username}
            className="shadow"
          />
        </Link>
        <div>
          <PatronStars tier={patron.tier} />
        </div>
        <div style={styles.username}>{patron.username}</div>
        <div style={styles.social}>
          <UserSocial accounts={patron.social} />
        </div>
      </div>
    )
    return null
  })

  return (
    <AppWrapper app={app} title={app.translate('app.patrons')} {...app.treeProps(props.path)} wide>
      <Blockquote type="tip">
        <h5>
          <FormattedMessage id="app.supportFreesewing" />
        </h5>
        <p>
          <FormattedMessage id="account.patronInfo" />
        </p>
        <p>
          <Button variant="contained" color="primary" size="large" href="/community/join/">
            <FormattedMessage id="app.becomeAPatron" />
          </Button>
        </p>
      </Blockquote>
      <div style={styles.list}>{list}</div>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allFsPatron {
      edges {
        node {
          patron {
            username
            pictureUris {
              m
            }
            social {
              twitter
              instagram
              github
            }
            handle
            tier
          }
        }
      }
    }
  }
`
