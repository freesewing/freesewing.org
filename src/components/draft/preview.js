import React, { useState } from 'react'
import useDesign from '../../hooks/useDesign'

import { withBreasts as withBreastsPatterns } from '@freesewing/pattern-info'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'

const DraftPreview = ({ app, design, person, data }) => {
  // Hooks
  const Pattern = useDesign(design)

  if (!person) return <p>This should never happen. Please report this.</p>

  // State
  const [pattern, setPattern] = useState('pending')

  // Draft the pattern
  let draft, error, patternProps
  try {
    draft = new Pattern(data.settings).use(i18nPlugin, {
      strings: patternTranslations
    })
    if (display === 'compare') {
      let compareWith = {}
      if (withBreastsPatterns.indexOf(design) === -1) compareWith = { ...withoutBreasts }
      else compareWith = { ...withBreasts }
      compareWith.model = person.measurements
      draft.sampleModels(compareWith, 'model')
    } else draft.draft()
    patternProps = draft.getRenderProps()
  } catch (err) {
    console.log({ err, draft })
    error = err
  }

  if (error) return <DraftError error={error} updatePatternData={mergeData} />
  else
    return (
      <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
        <Draft {...patternProps} />
      </figure>
    )
}

export default DraftPreview
