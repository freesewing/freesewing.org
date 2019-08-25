import React from 'react'
import FooterBase from '@freesewing/components/Footer'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Footer = props => {
  const data = useStaticQuery(graphql`
    {
      allFsPatron {
        edges {
          node {
            patron {
              username
              pictureUris {
                xs
              }
            }
          }
        }
      }
    }
  `)
  const styles = {
    ul: {
      margin: '2rem auto',
      padding: 0,
      maxWidth: '666px'
    },
    li: {
      display: 'inline',
      listStyleType: 'none'
    },
    img: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#000',
      margin: '2px',
      border: '1px solid #fff6'
    }
  }

  const patrons = {}
  data.allFsPatron.edges.map(node => (patrons[node.node.patron.username] = node.node.patron))

  const order = Object.keys(patrons)
  order.sort()
  //const list = []
  //order.map(username => {
  //  let patron = patrons[username]
  //  list.push(
  //    <li key={patron.username} style={styles.li}>
  //      <Link to={'/users/' + patron.username} title={patron.username}>
  //        <img src={patron.pictureUris.xs} alt={patron.username} style={styles.img} />
  //      </Link>
  //    </li>
  //  )
  //  return null
  //})

  //const allPatrons = <ul style={styles.ul}>{list}</ul>

  const links = {
    left: {
      blog: '/blog',
      aboutFreesewing: '/docs/about',
      faq: '/docs/faq'
    },
    right: {
      becomeAPatron: '/patrons/join',
      makerDocs: '/docs',
      devDocs: 'https://' + props.language + '.freesewing.dev/'
    }
  }

  return <FooterBase language={props.language} links={links} home="/" />
}

export default Footer
