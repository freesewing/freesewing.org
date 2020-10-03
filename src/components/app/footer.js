import React from 'react'
import Logo from '@freesewing/components/Logo'
import Icon from '@freesewing/components/Icon'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import { version } from '../../../package.json'
import MainIcons from '../menus/main-aside'

const Footer = (props) => {
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
      border: '1px solid #fff6',
      display: 'inline-block',
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    links: {
      margin: '0 1rem'
    }
  }

  const patrons = {}
  data.allFsPatron.edges.map((node) => (patrons[node.node.patron.username] = node.node.patron))

  const order = Object.keys(patrons)
  order.sort()
  const list = []
  order.map((username) => {
    let patron = patrons[username]
    list.push(
      <li key={patron.username} style={styles.li}>
        <Link to={'/users/' + patron.username} title={patron.username}>
          <img src={patron.pictureUris.xs} alt={patron.username} style={styles.img} />
        </Link>
      </li>
    )
    return null
  })

  const icons = {
    discord: 'https://discord.gg/YDV4GvU',
    twitter: 'https://twitter.com/freesewing_org',
    github: 'https://github.com/freesewing',
    instagram: 'https://instagram.com/freesewing_org'
  }

  return (
    <footer>
      <Link to="/">
        <Logo size={101} />
      </Link>
      <p dangerouslySetInnerHTML={{ __html: props.app.translate('app.txt-footer') }} />
      <MainIcons app={props.app} iconsOnly />
      <p className="social">
        {Object.keys(icons).map((i) => (
          <IconButton href={icons[i]} className={i} title={i} key={i}>
            <Icon icon={i} />
          </IconButton>
        ))}
      </p>
      <p className="version">
        <a href={'https://github.com/freesewing/freesewing/releases/tag/v' + version}>v{version}</a>
      </p>
    </footer>
  )
}

export default Footer
