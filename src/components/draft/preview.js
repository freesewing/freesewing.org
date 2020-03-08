import React, { useState, useEffect } from 'react'
import useDesign from '../../hooks/useDesign'
import usePattern from '../../hooks/usePattern'
import useMergeData from '../../hooks/useMergeData'

import {
  measurements as requiredMeasurements,
  withBreasts as withBreastsPatterns
} from '@freesewing/pattern-info'
import Blockquote from '@freesewing/components/Blockquote'
import Draft from '@freesewing/components/Draft'
import i18nPlugin from '@freesewing/plugin-i18n'
import { plugin as patternTranslations } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { version } from '../../../package.json'

import capitalize from '@freesewing/utils/capitalize'

const DraftPreview = ({ app, design, person, data }) => {
  // Methods
  const getInitialData = (initial = false) => {
    // Initial pattern data
    let initialData = initial
      ? initial
      : {
          design,
          version,
          settings: {
            sa: 10,
            complete: true,
            paperless: false,
            locale: app.language,
            units: app.account.settings ? app.account.settings.units : 'metric',
            options: {},
            measurements: {}
          }
        }

    for (let m of requiredMeasurements[design]) {
      initialData.settings.measurements[m] = person.measurements[m]
    }

    return initialData
  }
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

  // Main render element
  let main
  if (error) return <DraftError error={error} updatePatternData={mergeData} />
  else
    return (
      <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
        <Draft {...patternProps} />
      </figure>
    )
}

export default DraftPreview
