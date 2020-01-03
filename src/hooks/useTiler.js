import Tiler from '@freesewing/utils/tiler'

function useTiler(setNotification) {
  const tiler = new Tiler()

  const tile = (svg, format, size) => {
    tiler
      .tile(svg, format, size)
      .then(res => {
        if (res.status === 200) {
          if (typeof window !== 'undefined') window.location = res.data.link
        }
      })
      .catch(err => {
        console.log(err)
        setNotification('error', err)
      })
  }

  return { tile }
}

export default useTiler
