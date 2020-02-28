import Tiler from '@freesewing/utils/tiler'

function useTiler(setNotification) {
  const tiler = new Tiler()

  const tile = (svg, format, size) => {
    return tiler
      .tile(svg, format, size)
      .then(res => {
        if (res.status === 200) return res.data.link
        return false
      })
      .catch(err => {
        console.log(err)
        setNotification('error', err)
        return false
      })
  }

  return { tile }
}

export default useTiler
