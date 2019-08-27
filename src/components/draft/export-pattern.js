import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import fileSaver from 'file-saver'
import YAML from 'yaml'
import useTiler from '../../hooks/useTiler'
import theme from '@freesewing/plugin-theme'
import { plugin as patternTranslations } from '@freesewing/i18n'
import i18n from '@freesewing/plugin-i18n'

const ExportPattern = props => {
  const gist = { ...props.gist }
  delete gist.settings.embed

  const tiler = useTiler({
    intl: props.app.frontend.intl,
    showNotification: props.app.frontend.showNotification,
    startLoading: props.app.frontend.startLoading,
    stopLoading: props.app.frontend.stopLoading
  })
  const handleExport = (type, format) => {
    if (type === 'recipe') {
      if (format === 'json') exportJsonRecipe(gist)
      else if (format === 'yaml') exportYamlRecipe(gist)
    } else {
      const svg = new props.pattern({...props.gist.settings, embed: false})
        .use(theme)
        .use(i18n, {
          strings: patternTranslations
        })
        .draft()
        .render()
      if (type === 'raw') {
        if (format === 'svg') svgToFile(svg)
        else if (format === 'postscript') convert(svg, 'ps', 'full')
        else if (format === 'pdf') convert(svg, 'pdf', 'full')
      } else if (type === 'tile') convert(svg, 'pdf', format)
    }
  }

  const exportJsonRecipe = recipe => {
    const blob = new Blob([JSON.stringify(recipe, null, 2)], {
      type: 'application/json;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'recipe.json')
  }

  const exportYamlRecipe = recipe => {
    const blob = new Blob([YAML.stringify(recipe)], {
      type: 'application/x-yaml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'recipe.yaml')
  }

  const svgToFile = svg => {
    const blob = new Blob([svg], {
      type: 'image/svg+xml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'draft.svg')
  }

  const convert = (svg, format, size = 'full') => {
    tiler.tile(svg, format, size)
  }

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    column: {
      width: '30%'
    },
    button: {
      margin: '0.5rem',
      width: 'calc(100% - 1rem)'
    },
    blockquote: {
      background: 'red'
    }
  }
  if (props.app.frontend.tablet) styles.column.width = '45%'
  if (props.app.frontend.mobile) styles.column.width = '95%'

  const cancel = (
    <p style={{ textAlign: 'right' }}>
      <Button variant="outlined" color="primary" onClick={() => props.setDisplay('draft')} data-test="cancel">
        <FormattedMessage id="app.cancel" />
      </Button>
    </p>
  )

  const btnProps = {
    size: 'large',
    variant: 'contained',
    color: 'primary',
    style: styles.button
  }

  return (
    <React.Fragment>
      {cancel}
      <div style={styles.wrapper}>
        <div style={styles.column} data-test="printing">
          <h5><FormattedMessage id="app.exportForPrinting" /></h5>
          {['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'].map(size => (
            <Button {...btnProps} onClick={() => handleExport('tile', size)} data-test={size}>
              {size} PDF
            </Button>
          ))}
        </div>
        <div style={styles.column} data-test="editing">
          <h5><FormattedMessage id="app.exportForEditing" /></h5>
          {['svg', 'postscript', 'pdf'].map(format => (
            <Button {...btnProps} onClick={() => handleExport('raw', format)} data-test={format}>
              {format}
            </Button>
          ))}
        </div>
        <div style={styles.column} data-test="export">
          <h5><FormattedMessage id="app.exportRecipe" /></h5>
          {['json', 'yaml'].map(format => (
            <Button {...btnProps} onClick={() => handleExport('recipe', format)} data-test={format}>
              {format}
            </Button>
          ))}
        </div>
      </div>
      {cancel}
    </React.Fragment>
  )
}

export default ExportPattern
