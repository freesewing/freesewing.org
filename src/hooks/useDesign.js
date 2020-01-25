import aaron from '@freesewing/aaron'
import benjamin from '@freesewing/benjamin'
import bent from '@freesewing/bent'
import breanna from '@freesewing/breanna'
import brian from '@freesewing/brian'
import bruce from '@freesewing/bruce'
import carlton from '@freesewing/carlton'
import carlita from '@freesewing/carlita'
import cathrin from '@freesewing/cathrin'
import florent from '@freesewing/florent'
import huey from '@freesewing/huey'
import hugo from '@freesewing/hugo'
import jaeger from '@freesewing/jaeger'
import penelope from '@freesewing/penelope'
import sandy from '@freesewing/sandy'
import shin from '@freesewing/shin'
import simon from '@freesewing/simon'
import simone from '@freesewing/simone'
import sven from '@freesewing/sven'
import tamiko from '@freesewing/tamiko'
import theo from '@freesewing/theo'
import trayvon from '@freesewing/trayvon'
import wahid from '@freesewing/wahid'
import waralee from '@freesewing/waralee'

const designs = {
  aaron,
  benjamin,
  bent,
  breanna,
  brian,
  bruce,
  carlita,
  carlton,
  cathrin,
  florent,
  huey,
  hugo,
  jaeger,
  penelope,
  sandy,
  shin,
  simon,
  simone,
  sven,
  tamiko,
  theo,
  trayvon,
  wahid,
  waralee
}

function useDesign(design) {
  return designs[design]
}

export default useDesign
