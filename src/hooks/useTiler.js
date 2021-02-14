import Tiler from '@freesewing/utils/tiler'
import capitalize from '@freesewing/utils/capitalize'

function useTiler(setNotification) {
  const tiler = new Tiler()

  const tile = (svg, format, size, handle, design) => {
    return tiler
      .tile(svg, format, size, `https://freesewing.org/patterns/${handle}/`, capitalize(design))
      .then((res) => {
        if (res.status === 200) return res.data.link
        return false
      })
      .catch((err) => {
        console.log(err)
        setNotification('error', err)
        return false
      })
  }

  return { tile }
}

export default useTiler
