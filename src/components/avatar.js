import React from 'react'

const Avatar = props => {
  const style = {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    display: 'inline-block',
    backgroundColor: '#000',
    backgroundImage: 'url("https://freesewing.org/avatar.svg")',
    backgroundSize: 'cover'
  }

  const { picture, pictureUris } = props.data
  const pictureUrl = picture ? pictureUris.m : '/avatar.svg'

  return <img src={pictureUrl} style={style} />
}

export default Avatar
