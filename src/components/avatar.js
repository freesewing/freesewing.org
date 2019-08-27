import React from 'react'

const Avatar = props => {
  const style = {
    borderRadius: '50%',
    width: '100%',
    height: '100%'
  }

  const { picture, pictureUris } = props.data
  const pictureUrl = picture ? pictureUris.m : '/avatar.svg'

  return <img src={pictureUrl} style={style} alt="🙂" />
}

export default Avatar
