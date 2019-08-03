import React from 'react'
import PropTypes from 'prop-types'
import FieldButtons from './FieldButtons'
import Dropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import SelectImageIcon from '@material-ui/icons/AddAPhoto'

class ImageField extends React.PureComponent {
  state = {
    preview: false,
    avatarPreview: false
  }

  componentDidMount() {
    this.setState({ value: this.props.config.value })
  }

  handleValueUpdate = evt => {
    this.setState({ value: evt.target.value })
  }

  handleAvatarLoad = avatar => {
    this.setState({
      loadedAvatar: avatar,
      preview: true
    })
  }

  handleAvatarSave = (key, value, config) => {
    let reader = new FileReader()
    let save = this.props.updateField
    reader.readAsDataURL(this.state.avatarPreview)
    reader.addEventListener(
      'load',
      function() {
        save(key, reader.result, config)
      },
      false
    )
  }

  render() {
    let { item, config } = this.props
    const dropzoneRef = React.createRef()
    const style = {
      widht: '100%',
      border: '4px dashed #666',
      margin: '1rem 0',
      textAlign: 'center',
      padding: '4rem 1rem 3rem'
    }
    const previewStyle = {
      widht: '100%',
      height: '35vh',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    const activeStyle = { borderColor: '#1faa00' }
    const rejectStyle = { borderColor: '#d50000' }
    const handleAvatarDrop = (accepted, rejected) => {
      if (typeof accepted[0] !== 'undefined') {
        this.handleAvatarLoad(accepted[0])
        this.setState({ avatarPreview: accepted[0] })
      }
    }

    if (this.state.preview) {
      var reader = new FileReader()
      reader.readAsDataURL(this.state.avatarPreview)
      reader.addEventListener(
        'load',
        function() {
          imgRef.current.style.backgroundImage = 'url(' + reader.result + ')'
        },
        false
      )
      const imgRef = React.createRef()
      return (
        <React.Fragment>
          <input type="hidden" id="avatar" name="avatar" value={imgRef} />
          <div ref={imgRef} style={previewStyle} />
          <FieldButtons
            config={config}
            item={item}
            value={this.state.avatarPreview}
            updateDisplay={this.props.updateDisplay}
            updateField={this.handleAvatarSave}
          />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Dropzone
          ref={dropzoneRef}
          onDrop={handleAvatarDrop}
          style={style}
          activeStyle={activeStyle}
          rejectStyle={rejectStyle}
          multiple={false}
          accept="image/*"
        >
          <p>
            <FormattedMessage id="app.dragAndDropImageHere" />
          </p>
          <p>
            <Button
              variant="outlined"
              color="primary"
              classes={{ root: 'mt1' }}
              onClick={() => {
                dropzoneRef.current.open()
              }}
            >
              <SelectImageIcon className="mr1" />
              <FormattedMessage id="app.selectImage" />
            </Button>
          </p>
        </Dropzone>
      </React.Fragment>
    )
  }
}

ImageField.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
}

export default ImageField
