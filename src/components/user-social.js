import React from 'react'
import Icon from '@freesewing/components/Icon'

const UserSocial = props => {
  const renderIcon = (handle, service, size) => {
    if (handle === '') return <Icon icon={service} style={styles.mutedIcon} size={size || 24} />
    else
      return (
        <a href={'https://' + service + '.com/' + handle}>
          <Icon icon={service} style={styles.icon} size={size || 24} />
        </a>
      )
  }

  const renderSocial = social => {
    return [
      renderIcon(social.twitter, 'twitter', props.size),
      renderIcon(social.instagram, 'instagram', props.size),
      renderIcon(social.github, 'github', props.size)
    ]
  }

  const styles = {
    icon: {
      margin: '0.25rem'
    },
    mutedIcon: {
      margin: '0.25rem',
      opacity: '0.5'
    }
  }

  return renderSocial(props.accounts)
}

export default UserSocial
