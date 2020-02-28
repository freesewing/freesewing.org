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
import { plugin as strings } from '@freesewing/i18n'
import { withoutBreasts, withBreasts } from '@freesewing/models'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import { version } from '../../../package.json'
import DraftError from '../draft/error'

import capitalize from '@freesewing/utils/capitalize'

const DraftPreview = ({ app, data }) => {
  // Hooks
  const Pattern = useDesign(data.design)

  // Draft the pattern
  let error, patternProps
  try {
    patternProps = new Pattern(data.settings)
      .use(i18nPlugin, { strings })
      .draft()
      .getRenderProps()
    return (
      <figure key="pattern" style={{ textAlign: 'center' }} data-test="draft">
        <Draft {...patternProps} />
      </figure>
    )
  } catch (err) {
    return <DraftError error={err} />
  }
}

export default DraftPreview
